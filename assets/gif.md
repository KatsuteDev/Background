#### For Development Use

Size: `800x450`

Left: `560`

Gif: `ffmpeg -i IN.mp4 -vf "crop=800:450:560:0,fps=30,scale=800:450:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" OUT.gif`