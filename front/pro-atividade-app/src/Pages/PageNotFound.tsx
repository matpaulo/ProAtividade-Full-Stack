import { faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageNotFound: React.FC = () => {
  return (
    <div>
      <h1 className="mt-5 text-center text-secondary">
        <FontAwesomeIcon icon={faBug} className="me-5" />
        Ops...404 Page Not Found
        <FontAwesomeIcon icon={faBug} className="ms-5" />
      </h1>
    </div>
  );
};

export default PageNotFound;
