
import html2pdf from "html2pdf.js";
import QRCode from "qrcode";

export const generateQRCode = async (text: string) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error("Error generating QR code:", err);
    return "";
  }
};

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

export const generatePDF = async (event: Event, formData: FormData) => {
  const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const qrCodeData = await generateQRCode(ticketId);
  
  const element = document.createElement("div");
  element.innerHTML = `
    <div style="padding: 40px; font-family: Arial, sans-serif; position: relative;">
      <!-- Background Logo -->
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <img src="/lovable-uploads/14722ca5-d5ab-44f8-9cfd-5ac91a63f7e2.png" alt="Logo FSBM Background" style="max-width: 80%; max-height: 80%; object-fit: contain;">
      </div>

      <!-- Header with institutional logo -->
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="/lovable-uploads/dd20a8c4-f2b3-4438-af9e-4d9226a1dfd2.png" alt="Logo FSBM Header" style="height: 100px; margin: 0 auto;">
      </div>
      
      <!-- Decorative border -->
      <div style="border: 2px solid #1a365d; border-radius: 10px; padding: 30px; position: relative; background-color: rgba(255, 255, 255, 0.95);">
        <!-- Title -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a365d; font-size: 32px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">
            Invitation
          </h1>
          <h2 style="color: #2563eb; font-size: 24px; margin: 15px 0; font-weight: 600;">
            ${event.title}
          </h2>
        </div>
        
        <!-- Event details with elegant styling -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 25px;
                    margin: 20px 0;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center;">
            <p style="margin: 12px 0; font-size: 16px;">
              <strong style="color: #1a365d;">Date :</strong> 
              ${new Date(event.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p style="margin: 12px 0; font-size: 16px;">
              <strong style="color: #1a365d;">Horaire :</strong> 
              ${event.startTime} - ${event.endTime}
            </p>
            <p style="margin: 12px 0; font-size: 16px;">
              <strong style="color: #1a365d;">Lieu :</strong> 
              ${event.location}
            </p>
          </div>
        </div>
        
        <!-- Participant information -->
        <div style="background-color: #f8fafc;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;">
          <h3 style="color: #1a365d; margin-bottom: 15px; font-size: 20px; text-transform: uppercase;">
            Participant
          </h3>
          <p style="font-size: 18px; margin: 5px 0; color: #2563eb;">
            ${formData.get('firstName')} ${formData.get('lastName')}
          </p>
          <p style="font-size: 16px; margin: 5px 0; color: #64748b;">
            ${formData.get('profession')}
          </p>
        </div>
        
        <!-- QR Code section with elegant border -->
        <div style="text-align: center; margin: 30px 0;
                    padding: 20px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    background: #ffffff;">
          <img src="${qrCodeData}" alt="QR Code" style="width: 150px; height: 150px; margin: 0 auto;">
          <p style="margin-top: 10px; font-size: 12px; color: #64748b;">Code d'accès : ${ticketId}</p>
        </div>
        
        <!-- Footer note -->
        <div style="text-align: center;
                    padding: 20px;
                    background: linear-gradient(to right, #1a365d, #2563eb);
                    border-radius: 8px;
                    margin-top: 30px;">
          <p style="margin: 0; color: white; font-weight: bold; font-size: 16px;">
            Merci de présenter ce document le jour de l'événement
          </p>
        </div>
      </div>
    </div>
  `;

  const opt = {
    margin: 10,
    filename: `invitation-${event.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: true,
      allowTaint: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    console.log('Generating PDF...');
    const pdf = await html2pdf().from(element).set(opt).save();
    console.log('PDF generated successfully');
    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

