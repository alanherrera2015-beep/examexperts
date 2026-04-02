document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-print').addEventListener('click', function () {
        window.print();
    });

    var btnPdf = document.getElementById('btn-download-pdf');
    if (btnPdf) {
        btnPdf.addEventListener('click', async function () {
            var btn = this;
            var originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '⏳ Generating HD PDF…';

            try {
                var flyer = document.querySelector('.flyer');
                // Scale factor: 400 DPI ÷ 96 CSS px-per-inch ≈ 4.167
                var scale = 400 / 96;

                var canvas = await html2canvas(flyer, {
                    scale: scale,
                    useCORS: true,
                    allowTaint: false,
                    backgroundColor: '#ffffff',
                    logging: false
                });

                var imgData = canvas.toDataURL('image/png');
                var { jsPDF } = window.jspdf;
                var pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'in',
                    format: [8.5, 11]
                });

                // Stretch image to fill the full PDF page (8.5" × 11"); any minor
                // aspect-ratio difference is negligible for a letter-sized flyer
                pdf.addImage(imgData, 'PNG', 0, 0, 8.5, 11);
                pdf.save('examexperts-flyer.pdf');

            } catch (err) {
                console.error('HD PDF generation failed:', err);
                window.alert('HD PDF generation failed. Please use the Print button instead.');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }
});
