const fs = require("fs");

const ext = "katsute.code-background";

(async () => {
    const res = await fetch(
        `https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery/`,
        {
            method: "POST",
            body: JSON.stringify({
                filters: [
                    {
                        criteria: [{ filterType: 7, value: ext }],
                    },
                ],
                flags: 402, // see https://github.com/badges/shields/blob/master/services/visual-studio-marketplace/visual-studio-marketplace-base.js
            }),
            headers: {
                "accept": "application/json;api-version=3.0-preview.1",
                "content-type": "application/json"
            }
        }
    );
    const data = (await res.json()).results[0].extensions[0];

    {
        const rating = data.statistics.find((s) => s.statisticName === "averagerating").value;
        let stars = "";
        for(let i = 1; i <= 5; i++)
            if(rating >= i)
                stars += '★';
            else if(rating >= i - 0.5)
                stars += '⯪';
            else
                stars += '☆';

        fs.writeFileSync(
            "badge-rating.svg",
            `<svg xmlns="http://www.w3.org/2000/svg" width="151.75" height="28" role="img" aria-label="RATING: ${stars}"><title>RATING: ${stars}</title><g shape-rendering="crispEdges"><rect width="70.5" height="28" fill="#252526"/><rect x="70.5" width="81.25" height="28" fill="#0098ff"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="100"><text transform="scale(.1)" x="352.5" y="175" textLength="465" fill="#fff">RATING</text><text transform="scale(.1)" x="1111.25" y="175" textLength="572.5" fill="#fff" font-weight="bold">${stars}</text></g></svg>`,
            {encoding: "utf-8"}
        );
    }

    {
        const installs = data.statistics.find(s => s.statisticName === "install").value;
        let installsText;
        if(installs >= 1_000_000)
            installsText = (installs / 1_000_000).toFixed(1) + 'M';
        else if(installs >= 1_000)
            installsText = (installs / 1_000).toFixed(0) + 'K';
        else
            installsText = installs.toString();

        fs.writeFileSync(
            "badge-installs.svg",
            `<svg xmlns="http://www.w3.org/2000/svg" width="141" height="28" role="img" aria-label="INSTALLS: ${installsText}"><title>INSTALLS: ${installsText}</title><g shape-rendering="crispEdges"><rect width="83" height="28" fill="#252526"/><rect x="83" width="58" height="28" fill="#0098ff"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="100"><text transform="scale(.1)" x="415" y="175" textLength="590" fill="#fff">INSTALLS</text><text transform="scale(.1)" x="1120" y="175" textLength="340" fill="#fff" font-weight="bold">${installsText}</text></g></svg>`,
            {encoding: "utf-8"}
        );
    }

    {
        const downloads = data.statistics.find(s => s.statisticName === "install").value + data.statistics.find(s => s.statisticName === "updateCount").value;
        let installsText;
        if(downloads >= 1_000_000)
            installsText = (downloads / 1_000_000).toFixed(1) + 'M';
        else if(downloads >= 1_000)
            installsText = (downloads / 1_000).toFixed(0) + 'K';
        else
            installsText = downloads.toString();

        fs.writeFileSync(
            "badge-downloads.svg",
            `<svg xmlns="http://www.w3.org/2000/svg" width="158.25" height="28" role="img" aria-label="DOWNLOADS: ${installsText}"><title>DOWNLOADS: ${installsText}</title><g shape-rendering="crispEdges"><rect width="102.25" height="28" fill="#252526"/><rect x="102.25" width="56" height="28" fill="#0098ff"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="100"><text transform="scale(.1)" x="511.25" y="175" textLength="782.5" fill="#fff">DOWNLOADS</text><text transform="scale(.1)" x="1302.5" y="175" textLength="320" fill="#fff" font-weight="bold">${installsText}</text></g></svg>`,
            {encoding: "utf-8"}
        );
    }
})();