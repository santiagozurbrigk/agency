from __future__ import annotations

from pathlib import Path
import os
import shutil
import subprocess


def ytdlp_cmd() -> list[str]:
    """Base yt-dlp command: use node as JS runtime when deno is missing, optional cookies file."""
    cmd = ["yt-dlp"]
    if not shutil.which("deno") and shutil.which("node"):
        cmd += ["--js-runtimes", "node"]
    cookies = os.getenv("YTDLP_COOKIES")
    if cookies and os.path.isfile(os.path.expanduser(cookies)):
        cmd += ["--cookies", os.path.expanduser(cookies)]
    return cmd


def is_url(source: str) -> bool:
    return source.startswith("http://") or source.startswith("https://")


def download_video(source: str, working_dir: Path) -> Path:
    """Download video for URL sources and return local path."""
    output_template = str(working_dir / "video.%(ext)s")
    cmd = [
        *ytdlp_cmd(),
        "--no-playlist",
        "--merge-output-format",
        "mp4",
        "-o",
        output_template,
        source,
    ]
    subprocess.run(cmd, check=True)

    matches = sorted(working_dir.glob("video.*"))
    if not matches:
        raise RuntimeError("Video download did not produce an output file.")
    return matches[0]
