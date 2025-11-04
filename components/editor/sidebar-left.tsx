'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useImageStore } from '@/lib/store';
import { ExportDialog } from '@/components/canvas/dialogs/ExportDialog';
import { StyleTabs } from './style-tabs';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { PresetSelector } from '@/components/presets/PresetSelector';
import { useExport } from '@/hooks/useExport';

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { 
    uploadedImageUrl, 
    selectedAspectRatio, 
    clearImage,
    selectedGradient,
    borderRadius,
    backgroundBorderRadius,
    backgroundConfig,
    textOverlays,
    imageOpacity,
    imageScale,
    imageBorder,
    imageShadow,
  } = useImageStore();
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);

  const {
    settings: exportSettings,
    isExporting,
    updateFormat,
    updateQuality,
    updateScale,
    exportImage,
  } = useExport(selectedAspectRatio);

  return (
    <>
      <Sidebar className="border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl" {...props}>
        <SidebarHeader className="p-3 sm:p-4 border-b border-sidebar-border min-w-0">
          <div className="flex flex-col gap-2.5">
            <PresetSelector />
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => setExportDialogOpen(true)}
                disabled={!uploadedImageUrl}
                className="w-full h-9 justify-center gap-2.5 rounded-lg bg-background hover:bg-accent text-foreground border border-border hover:border-border/80 shadow-none hover:shadow-sm transition-all duration-200 font-medium text-xs px-3 overflow-hidden"
                variant="outline"
                size="sm"
              >
                <Download className="size-4 shrink-0" />
                <span className="truncate">Export Image</span>
              </Button>
              <Button
                onClick={clearImage}
                disabled={!uploadedImageUrl}
                className="w-full h-9 justify-center gap-2.5 rounded-lg bg-background hover:bg-destructive/10 text-destructive border border-destructive/20 hover:border-destructive/40 shadow-none hover:shadow-sm transition-all duration-200 font-medium text-xs px-3 hover:text-destructive overflow-hidden"
                variant="outline"
                size="sm"
              >
                <Trash2 className="size-4 shrink-0" />
                <span className="truncate">Remove Image</span>
              </Button>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-7 space-y-4 sm:space-y-6 overflow-x-hidden overflow-y-auto">
          <StyleTabs />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        onExport={() => exportImage().then(() => {})}
        format={exportSettings.format}
        quality={exportSettings.quality}
        scale={exportSettings.scale}
        isExporting={isExporting}
        onFormatChange={updateFormat}
        onQualityChange={updateQuality}
        onScaleChange={updateScale}
      />
    </>
  );
}
