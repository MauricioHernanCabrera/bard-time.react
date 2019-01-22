import React from 'react'

const FooterFloating = ({
  children
}) => {
  return (
    <div className="Footer-floating-container">
      <div className="Footer-floating-wrapper">
        <div className="Footer-floating">
          {children}
        </div>
      </div>

      <style jsx>{`
        .Footer-floating-container {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        }

        .Footer-floating-wrapper {
          height: 100%;
          display: grid;

          grid-template-columns: minmax(auto, 1024px);
          justify-content: center;
          align-content: center;
        }

        .Footer-floating {
          height: 60px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          border-top: 2px solid var(--color-cloud-2);
          background-color: var(--color-cloud-1);
        }
      `}</style>
    </div>
  )
}

export default FooterFloating