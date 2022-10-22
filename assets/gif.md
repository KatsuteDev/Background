#### For Development Use

Size: `800x450`

Left: `560`

Gif: `ffmpeg -i IN.mp4 -vf "fps=30,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" OUT.gif`
