import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <>
      <nav className=" navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-25 d-flex justify-content-center">
        
          <div className="row m-2">
            <SocialIcon
              className="col m-2"
              url="https://twitter.com/ransherraj1"
            />
            <SocialIcon
              className="col m-2"
              url="https://www.facebook.com/profile.php?id=100017568393148#"
            />
            <SocialIcon
              className="col m-2"
              url="https://www.instagram.com/ransherraj/"
            />
            <SocialIcon
              className="col m-2"
              url="https://www.linkedin.com/in/ransherraj/"
            />
            <SocialIcon
              className="col m-2"
              url="https://github.com/ransherraj"
            />
          </div>
        

        
      </nav>

      <div className="navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-25 pb-4 d-flex justify-content-center">
          <div className="footer d-flex justify-content-center">
            Bookrr &copy; All rights reserved, {new Date().getFullYear()}
          </div>
        </div>

        <div className="navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-25 p-4 d-flex justify-content-center">
          
        </div>
    </>
  );
}
