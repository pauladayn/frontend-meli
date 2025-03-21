import { Link } from "react-router";

const ErrorPage = () => (
  <div className="container">
      <div className="row card error-layout">
          <div className="col-12">
              <div className="center error-layout__content">
                  <p>Ocurrió un error inesperado</p>
                  <Link to="/" className="main-btn">
                      Volver al inicio
                  </Link>
              </div>
          </div>
      </div>
  </div>
);

export default ErrorPage;