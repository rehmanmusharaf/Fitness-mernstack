import React from "react";
//import {Link} from "react-router-dom"
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer h-auto bg-black ">
      <div className="footer--wrapper">
        <div className="footer--desc">
          <h2>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M44.412 17.9484L47.7148 14.7109C47.882 14.5436 47.9901 14.2878 47.9901 14.0319C47.9901 13.7663 47.8918 13.5203 47.705 13.3333L44.3628 9.98764L47.705 6.71085C47.8918 6.52387 47.9999 6.27787 47.9999 6.0122C47.9999 5.74652 47.9016 5.50052 47.7148 5.31354L42.6918 0.285344C42.505 0.0983607 42.2593 0 41.9939 0C41.7285 0 41.4827 0.108197 41.2959 0.29518L38.0225 3.64082L34.6803 0.29518C34.4936 0.108197 34.238 0.00983607 33.9824 0.00983607C33.717 0.00983607 33.4712 0.118033 33.2845 0.305016L30.0504 3.61131L26.7475 0.305016C26.3641 -0.0787869 25.7448 -0.0787869 25.3615 0.305016L20.3383 5.33331C20.1515 5.5203 20.0533 5.7663 20.0533 6.03197C20.0533 6.29764 20.1614 6.54364 20.3383 6.73062L27.6617 14.0615L14.0668 27.6703L6.74341 20.3394C6.55662 20.1524 6.31092 20.0541 6.04544 20.0541C5.78006 20.0541 5.53426 20.1623 5.34747 20.3394L0.304721 25.3284C-0.0786885 25.7122 -0.0786885 26.332 0.304721 26.7158L3.60757 30.0221L0.294885 33.2496C0.108098 33.4366 0 33.6826 0 33.9483C0 34.214 0.0982623 34.46 0.285049 34.6469L3.64692 38.0123L0.304721 41.2891C0.117934 41.476 0.00983606 41.722 0.00983606 41.9877C0.00983606 42.2534 0.108098 42.4994 0.294885 42.6864L5.31806 47.7147C5.50485 47.9016 5.75056 48 6.01603 48C6.28141 48 6.52721 47.8918 6.714 47.7048L9.98744 44.3592L13.3198 47.695C13.5066 47.882 13.7523 47.9803 14.0178 47.9803C14.2832 47.9803 14.5289 47.8721 14.7157 47.6852L17.9695 44.3887L21.2822 47.7048C21.4788 47.9016 21.7245 47.9902 21.9802 47.9902C22.2357 47.9902 22.4815 47.8918 22.6781 47.7048L27.7013 42.6765C28.0847 42.2927 28.0847 41.6729 27.7013 41.2891L20.378 33.9581L33.9729 20.3492L41.2962 27.6802C41.4928 27.877 41.7385 27.9655 41.9942 27.9655C42.2498 27.9655 42.4955 27.8671 42.6922 27.6802L47.7153 22.6519C47.9021 22.4649 48.0004 22.2189 48.0004 21.9532C48.0004 21.6875 47.8923 21.4415 47.7153 21.2546L44.412 17.9484ZM41.9939 2.37148L45.6113 5.99262L42.9671 8.59043L41.1878 6.80941L39.4086 5.02839L41.9939 2.37148ZM33.9726 2.37148L45.6113 14.0124L43.0063 16.5807L31.4168 4.97911L33.9726 2.37148ZM6.01603 45.6285L2.39862 42.0074L5.04285 39.4096L8.61118 42.9815L6.01603 45.6285ZM14.0176 45.6187L10.6852 42.2829L5.74072 37.3333L2.38869 33.9778L5.00351 31.4292L10.7934 37.225L16.5931 43.0306L14.0176 45.6187ZM25.6072 42.0074L21.98 45.6384L18.6673 42.3222L5.70138 29.3431L2.38869 26.027L6.01593 22.396L25.6072 42.0074ZM18.9817 32.5806L15.4232 29.0185L29.0182 15.4096L32.5766 18.9717L18.9817 32.5806ZM41.9841 25.604L33.835 17.4465L29.7162 13.3235L22.3928 5.99262L26.02 2.36164L29.3327 5.67777L42.2985 18.6569L45.6112 21.973L41.9841 25.604Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Fitnation
          </h2>
          <p>Luxury Fitness guidance </p>
          {/* <p>10th st, behind the gas station, Miami, FL-USA </p> */}
          <p id="phone">+927-985-8884</p>
        </div>
        <div className="footer--links">
          <div className="footer--title">
            <h4>Contact Us</h4>
          </div>
          <a href="/" className="footer--link">
            Contact
          </a>
          <a href="/" className="footer--link">
            Support
          </a>
          <a href="/" className="footer--link">
            Sponsorships
          </a>
        </div>
      </div>
      <div className="footer--wrapper">
        <div className="footer--links">
          <div className="footer--title">
            <h4>Memberships</h4>{" "}
          </div>
          <a href="/Features" className="footer--link">
            Features
          </a>
          <a href="/Plans" className="footer--link">
            Plans
          </a>
          <a href="/FAQs" className="footer--link">
            FAQs
          </a>
        </div>
        <div className="footer--links">
          <div className="footer--title">
            <h4>Social Media</h4>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer--link"
          >
            Facebook
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer--link"
          >
            Twitter
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer--link"
          >
            Instagram
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer--link"
          >
            Youtube
          </a>
        </div>
      </div>
    </div>
  );
}
