"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Text, Transformer, Rect, Line } from "react-konva";
import { useCanvasContext } from "./CanvasContext";
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "@/lib/constants";
import Konva from "konva";

interface CanvasEditorProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  className?: string;
  onBackgroundColorChange?: (color: string) => void;
}

export function CanvasEditor({
  width = DEFAULT_CANVAS_WIDTH,
  height = DEFAULT_CANVAS_HEIGHT,
  backgroundColor = "#ffffff",
  className = "",
  onBackgroundColorChange,
}: CanvasEditorProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { initializeCanvas, objects, selectedObject, operations, layer } = useCanvasContext();
  const [scale, setScale] = useState(1);
  const [showGuides, setShowGuides] = useState(false);
  const [draggingObject, setDraggingObject] = useState<string | null>(null);

  // Calculate scale to fit canvas in viewport
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Calculate padding (4 * 16px = 64px total padding from parent)
        const padding = 64;
        const availableWidth = containerWidth - padding;
        const availableHeight = containerHeight - padding;
        
        const scaleX = availableWidth / width;
        const scaleY = availableHeight / height;
        const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
        
        setScale(newScale);
      }
    };

    // Initial update
    const timeoutId = setTimeout(updateScale, 100);
    updateScale();
    
    window.addEventListener('resize', updateScale);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateScale);
    };
  }, [width, height]);

  useEffect(() => {
    if (stageRef.current && layerRef.current) {
      initializeCanvas(stageRef.current, layerRef.current);
    }
  }, [initializeCanvas]);

  useEffect(() => {
    if (stageRef.current) {
      stageRef.current.width(width);
      stageRef.current.height(height);
      // Don't scale the stage - use CSS transform instead
    }
  }, [width, height]);

  // Update transformer when selection changes
  useEffect(() => {
    if (!transformerRef.current || !layerRef.current || !selectedObject) {
      transformerRef.current?.nodes([]);
      return;
    }

    // Find the Konva node for the selected object
    const selectedNode = layerRef.current.findOne(`#${selectedObject.id}`);
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      layerRef.current.batchDraw();
    }
  }, [selectedObject, layer]);

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      operations.clearSelection();
    }
  };

  const handleObjectClick = (obj: typeof objects[0]) => {
    const found = objects.find((o) => o.id === obj.id);
    if (found) {
      if (operations.selectObject) {
        operations.selectObject(obj.id);
      } else {
        // Fallback: trigger selection through transform
        operations.transformObject(obj.id, {});
      }
    }
  };

  // Sync backgroundColor with background rect (only if no gradient/image is set)
  useEffect(() => {
    if (layerRef.current && backgroundColor) {
      const bgRect = layerRef.current.findOne((node: any) => node.id() === "canvas-background") as Konva.Rect;
      if (bgRect && bgRect instanceof Konva.Rect) {
        // Only update if there's no gradient or pattern
        const hasGradient = bgRect.fillLinearGradientColorStops()?.length > 0 || 
                           bgRect.fillRadialGradientColorStops()?.length > 0;
        const hasPattern = bgRect.fillPatternImage() !== null;
        
        if (!hasGradient && !hasPattern) {
          bgRect.fill(backgroundColor);
          layerRef.current.batchDraw();
        }
      }
    }
  }, [backgroundColor, layer]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-visible flex items-center justify-center ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      <div 
        ref={wrapperRef}
        style={{ 
          width: `${width * scale}px`, 
          height: `${height * scale}px`,
          position: 'relative',
          backgroundColor: backgroundColor,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
        className="rounded-lg overflow-hidden"
      >
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onClick={handleStageClick}
          onTap={handleStageClick}
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: backgroundColor,
          }}
        >
        <Layer ref={layerRef}>
          {/* Background Rectangle */}
          <Rect
            id="canvas-background"
            x={0}
            y={0}
            width={width}
            height={height}
            fill={backgroundColor}
            listening={false}
          />
          
          {/* Center Guide Lines */}
          {showGuides && (
            <>
              {/* Vertical center line */}
              <Line
                points={[width / 2, 0, width / 2, height]}
                stroke="#3b82f6"
                strokeWidth={1}
                dash={[5, 5]}
                opacity={0.6}
                listening={false}
              />
              {/* Horizontal center line */}
              <Line
                points={[0, height / 2, width, height / 2]}
                stroke="#3b82f6"
                strokeWidth={1}
                dash={[5, 5]}
                opacity={0.6}
                listening={false}
              />
            </>
          )}
          
          {/* Render objects */}
          {objects.map((obj) => {
            const isSelected = selectedObject?.id === obj.id;
            
            if (obj.type === "image" && obj.image) {
              return (
                <Image
                  key={obj.id}
                  id={obj.id}
                  image={obj.image}
                  x={obj.x}
                  y={obj.y}
                  width={obj.width}
                  height={obj.height}
                  scaleX={obj.scaleX ?? 1}
                  scaleY={obj.scaleY ?? 1}
                  rotation={obj.rotation ?? 0}
                  draggable
                  onClick={() => handleObjectClick(obj)}
                  onTap={() => handleObjectClick(obj)}
                  onDragStart={() => {
                    setDraggingObject(obj.id);
                    setShowGuides(true);
                  }}
                  onDragMove={(e) => {
                    const node = e.target;
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const objCenterX = node.x() + (node.width() * node.scaleX()) / 2;
                    const objCenterY = node.y() + (node.height() * node.scaleY()) / 2;
                    
                    // Snap to center if within 10px
                    const snapThreshold = 10;
                    if (Math.abs(objCenterX - centerX) < snapThreshold) {
                      node.x(centerX - (node.width() * node.scaleX()) / 2);
                    }
                    if (Math.abs(objCenterY - centerY) < snapThreshold) {
                      node.y(centerY - (node.height() * node.scaleY()) / 2);
                    }
                  }}
                  onDragEnd={(e) => {
                    setDraggingObject(null);
                    setShowGuides(false);
                    operations.transformObject(obj.id, {
                      left: e.target.x(),
                      top: e.target.y(),
                    });
                  }}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    
                    node.scaleX(1);
                    node.scaleY(1);
                    
                    operations.transformObject(obj.id, {
                      left: node.x(),
                      top: node.y(),
                      scaleX: scaleX,
                      scaleY: scaleY,
                      angle: node.rotation(),
                    });
                  }}
                />
              );
            }
            
            if (obj.type === "text") {
              return (
                <Text
                  key={obj.id}
                  id={obj.id}
                  text={obj.text || ""}
                  x={obj.x}
                  y={obj.y}
                  fontSize={obj.fontSize || 48}
                  fill={obj.fill || "#000000"}
                  scaleX={obj.scaleX ?? 1}
                  scaleY={obj.scaleY ?? 1}
                  rotation={obj.rotation ?? 0}
                  draggable
                  align="center"
                  offsetX={0}
                  offsetY={0}
                  onClick={() => handleObjectClick(obj)}
                  onTap={() => handleObjectClick(obj)}
                  onDragStart={() => {
                    setDraggingObject(obj.id);
                    setShowGuides(true);
                  }}
                  onDragMove={(e) => {
                    const node = e.target;
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const textWidth = node.width();
                    const textHeight = node.height();
                    const objCenterX = node.x();
                    const objCenterY = node.y();
                    
                    // Snap to center if within 10px
                    const snapThreshold = 10;
                    if (Math.abs(objCenterX - centerX) < snapThreshold) {
                      node.x(centerX);
                    }
                    if (Math.abs(objCenterY - centerY) < snapThreshold) {
                      node.y(centerY);
                    }
                  }}
                  onDragEnd={(e) => {
                    setDraggingObject(null);
                    setShowGuides(false);
                    operations.transformObject(obj.id, {
                      left: e.target.x(),
                      top: e.target.y(),
                    });
                  }}
                  onTransformEnd={(e) => {
                    const node = e.target;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    
                    node.scaleX(1);
                    node.scaleY(1);
                    
                    operations.transformObject(obj.id, {
                      left: node.x(),
                      top: node.y(),
                      scaleX: scaleX,
                      scaleY: scaleY,
                      angle: node.rotation(),
                    });
                  }}
                />
              );
            }
            
            return null;
          })}
          
          {/* Transformer for selected objects */}
          {selectedObject && (
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
      </div>
    </div>
  );
}