import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
  const [copiedLink, setCopiedLink] = useState(false);
  const location = useLocation();

  const copyToClipboard = () => {
    copy(`http://localhost:3000${location.pathname.replace('/in-progress', '')}`);
    setCopiedLink(true);
    const TWO_SECONDS = 2000;
    setTimeout(() => { setCopiedLink(false); }, TWO_SECONDS);
  };
  return (
    <div>
      {
        copiedLink ? (
          <p className="text-link-copied">
            Link copied!
          </p>
        ) : (
          <input
            type="image"
            data-testid="share-btn"
            alt="icon of Share"
            src={ Share }
            onClick={ () => copyToClipboard() }
          />
        )
      }
    </div>
  );
}
export default ShareButton;
// teste do github com bug
