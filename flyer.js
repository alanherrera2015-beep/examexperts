document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-print').addEventListener('click', function () {
        window.print();
    });

    var btnSvg = document.getElementById('btn-download-svg');
    if (btnSvg) {
        btnSvg.addEventListener('click', async function () {
            var btn = this;
            var originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '⏳ Generating SVG…';

            try {
                var flyer = document.querySelector('.flyer');

                var svgDataUrl = await htmlToImage.toSvg(flyer, {
                    backgroundColor: '#ffffff'
                });

                // Derive a filename from the page title or fall back to a default
                var slug = document.title
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '') || 'examexperts-flyer';

                var a = document.createElement('a');
                a.href = svgDataUrl;
                a.download = slug + '.svg';
                a.click();

            } catch (err) {
                console.error('SVG generation failed:', err);
                window.alert('SVG generation failed. Please use the Print button instead.');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }
});
