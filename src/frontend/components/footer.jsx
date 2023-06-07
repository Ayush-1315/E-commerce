import GithubLogo from "../../images/github.svg";
import LinkedInLogo from "../../images/linkedin.svg";
import InstagramLogo from "../../images/instagram.svg";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="logo">ShopsyCart</div>
      <div>©Developed By <a href="https://ayush-1315.netlify.app/" target="_blank" rel="noopener noreferrer">Ayush Raj</a></div>
      <div className="footerLinks">
        <a href="https://github.com/Ayush-1315" target="_blank" rel="noopener noreferrer"><img src={GithubLogo} alt="github" className="footerIcons"/></a>
        <a href="https://www.linkedin.com/in/ayush-r-1a9095119/" target="_blank" rel="noopener noreferrer"><img src={LinkedInLogo} alt="linkedIn" className="footerIcons"/></a>
        <a href="https://www.instagram.com/ayush1308rj/" target="_blank" rel="noopener noreferrer"><img src={InstagramLogo} alt="instagram" className="footerIcons"/></a>
      </div>
    </div>
  );
};
