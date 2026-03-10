import logoImage from '../assets/rphs_logo.png';

interface HospitalLogoProps {
  height?: number;
  /** When true, logo is rendered on a dark background */
  inverted?: boolean;
}

export default function HospitalLogo({ height = 56, inverted = false }: HospitalLogoProps) {
  if (inverted) {
    // On dark backgrounds: invert the image so the white bg becomes black,
    // then screen-blend it — black pixels disappear against dark, logo marks become visible.
    return (
      <img
        src={logoImage}
        alt="R.P Super Speciality Hospital"
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
          flexShrink: 0,
          filter: 'invert(1)',
          mixBlendMode: 'screen',
        }}
      />
    );
  }

  return (
    <img
      src={logoImage}
      alt="R.P Super Speciality Hospital"
      style={{
        height: `${height}px`,
        width: 'auto',
        display: 'block',
        objectFit: 'contain',
        flexShrink: 0,
      }}
    />
  );
}

