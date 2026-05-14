document.addEventListener('DOMContentLoaded', function () {
    function getExportSlug() {
        return document.title
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'examexperts-flyer';
    }

    async function exportFlyerAsSvg(flyer) {
        return htmlToImage.toSvg(flyer, {
            backgroundColor: '#ffffff'
        });
    }

    async function exportFlyerAsPdf(flyer) {
        if (!window.html2canvas || !window.jspdf || !window.jspdf.jsPDF) {
            throw new Error('PDF export libraries are unavailable.');
        }

        var jsPDF = window.jspdf.jsPDF;
        var pages = flyer.querySelectorAll('.sheet');
        var exportPages = pages.length ? Array.from(pages) : [flyer];
        var pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'in',
            format: [11, 8.5],
            compress: true
        });

        for (var i = 0; i < exportPages.length; i += 1) {
            var page = exportPages[i];
            var canvas = await window.html2canvas(page, {
                backgroundColor: '#ffffff',
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: page.scrollWidth,
                windowHeight: page.scrollHeight
            });

            if (i > 0) {
                pdf.addPage([11, 8.5], 'landscape');
            }

            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 11, 8.5, undefined, 'FAST');
        }

        pdf.save(getExportSlug() + '.pdf');
    }

    document.getElementById('btn-print').addEventListener('click', function () {
        window.print();
    });

    var btnSvg = document.getElementById('btn-download-svg');
    if (btnSvg) {
        btnSvg.addEventListener('click', async function () {
            var btn = this;
            var originalText = btn.innerHTML;
            btn.disabled = true;
            var exportFormat = btn.dataset.exportFormat === 'pdf' ? 'pdf' : 'svg';
            btn.innerHTML = exportFormat === 'pdf' ? '⏳ Generating PDF…' : '⏳ Generating SVG…';

            try {
                var flyer = document.querySelector('.flyer');
                if (exportFormat === 'pdf') {
                    await exportFlyerAsPdf(flyer);
                } else {
                    var svgDataUrl = await exportFlyerAsSvg(flyer);
                    var a = document.createElement('a');
                    a.href = svgDataUrl;
                    a.download = getExportSlug() + '.svg';
                    a.click();
                }

            } catch (err) {
                console.error((exportFormat === 'pdf' ? 'PDF' : 'SVG') + ' generation failed:', err);
                window.alert((exportFormat === 'pdf' ? 'PDF' : 'SVG') + ' generation failed. Please use the Print button instead.');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }
});
