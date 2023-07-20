const html = (params: { url: string; host: string; email: string }) => {
  const { url, host, email } = params;

  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  // const signinEmailRoute = "http://localhost:3000/signin-email"

  return `<!DOCTYPE html>
    <html lang="en" xmlns="https://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title>FitGenie App</title>
      <!--[if mso]> 
    <style> 
    table {border-collapse:collapse;border-spacing:0;border:none;margin:0;} 
    div, td {padding:0;} 
    div {margin:0 !important;} 
    </style> 
    <noscript> 
    <xml> 
    <o:OfficeDocumentSettings> 
    <o:PixelsPerInch>96</o:PixelsPerInch> 
    </o:OfficeDocumentSettings> 
    </xml> 
    </noscript> 
    <![endif]-->
        <style>
            table, td, div, h1, p {
                font-family: Arial, sans-serif;
            }
        </style>
    </head>
    <body>
      <table style="width: 80%; max-width: 700px; padding: 4rem; text-align: center; margin: 0 auto; background-color: #030711; color: #F7FAFC">
        <tr>
          <td>
            <hr />
          </td>
        </tr>
      
        <tr>
          <td style="padding: 1rem 0.3rem;">
            <img src="https://pbs.twimg.com/profile_images/1651944510946004992/9bqY__CT_400x400.jpg" style="border-radius: 50%; width: 180px; height: 180px; object-fit: cover;" alt="FitGenie Logo" />
            <h1 style="font-size: 2.8rem; font-weight: bold; margin: 1rem 0rem">FitGenie</h1>
            <p style="font-size: 1.2rem; color: #7F8EA3;">Your Fitness Coach app of customized workouts</p>
          </td>
        </tr>
      
        <tr>
          <td>
            <hr />
          </td>
        </tr>
      
        <tr>
          <td style="padding: 1rem 0rem;">
            <h2 style="font-size: 1.8rem;">Start your fitness journey!</h2>
            <div style="font-size: 1rem; color: #7F8EA3; margin: 0.4rem 0rem 1.8rem;">
              <p>You will find workouts for every fitness level. Our friendly FitGenie coach powered by OpenAI is here to help you find the right programs to achieve your workout goals.</p>
              <br />
              <p>Please complete the sign-in process with your email <strong>${escapedEmail}</strong> to have access to your coach!</p>
            </div>
              <br />
            <a href="${url}" style="font-size: 1.5rem; color: #F7FAFC; font-weight: bold; background-color: #1D283A; border-radius: 0.3rem; padding: 0.7rem 1.2rem; text-decoration: none;">Sign-in</a>
          </td>
        </tr>
    </table>
  
    </body>
    `;
};

export default html;
