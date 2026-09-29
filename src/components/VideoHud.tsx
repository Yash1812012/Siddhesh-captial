import { Play, Pause } from 'lucide-react';

interface VideoHudProps {
  isPlaying: boolean;
  currentVideoTime: number;
  videoDuration: number;
  scrubSensitivity: number;
  onTogglePlayback: () => void;
  onChangeSensitivity: (val: number) => void;
  onTriggerFileInput: () => void;
}

export function VideoHud({
  isPlaying,
  currentVideoTime,
  videoDuration,
  scrubSensitivity,
  onTogglePlayback,
  onChangeSensitivity,
  onTriggerFileInput,
}: VideoHudProps) {
  return (
    <div className="fixed bottom-3 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onTogglePlayback}
          className="flex items-center gap-1.5 text-white hover:text-neutral-300 transition-colors cursor-pointer"
          title={isPlaying ? 'Pause video (enable mouse scrub)' : 'Play video continuously'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="font-mono">{isPlaying ? 'Playing' : 'Mouse-Scrub'}</span>
        </button>
        <span className="text-white/20">|</span>
        <span className="font-mono text-neutral-300">
          {currentVideoTime.toFixed(1)}s / {videoDuration.toFixed(1)}s
        </span>
        <span className="hidden sm:inline text-neutral-500">
          {isPlaying ? 'Continuous loop' : 'Hover / drag cursor horizontally'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden md:flex items-center gap-1.5 text-[11px] text-neutral-400 cursor-pointer">
          <span>Sensitivity:</span>
          <select
            value={scrubSensitivity}
            onChange={(e) => onChangeSensitivity(parseFloat(e.target.value))}
            className="bg-neutral-900 border border-white/20 rounded px-1.5 py-0.5 text-white text-xs cursor-pointer focus:outline-none"
          >
            <option value="0.5">Smooth (0.5x)</option>
            <option value="0.8">Standard (0.8x)</option>
            <option value="1.4">Rapid (1.4x)</option>
          </select>
        </label>
        <button
          type="button"
          onClick={onTriggerFileInput}
          className="text-[11px] text-neutral-300 hover:text-white underline cursor-pointer"
          title="Upload custom video to replace hero background"
        >
          Replace Video
        </button>
      </div>
    </div>
  );
}
