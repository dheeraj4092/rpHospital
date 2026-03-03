import logoImage from '../assets/rphs_logo.png';

/**
 * HospitalLogo — R.P Super Speciality Hospital brand mark.
 */
interface HospitalLogoProps {
  /** height of the logo in pixels. Width scales proportionally. */
  height?: number;
  /** render on a dark background — inverts the navy to white */
  inverted?: boolean;
}

export default function HospitalLogo({ height = 56, inverted = false }: HospitalLogoProps) {
  return (
    <img 
      src={logoImage} 
      alt="R.P Super Speciality Hospital" 
      style={{ 
        height: `${height}px`,
        width: 'auto',
        filter: inverted ? 'brightness(0) invert(1) brightness(2)' : 'none',
        objectFit: 'contain',
        display: 'block'
      }}
      className="flex-shrink-0 select-none"
    />
  );
}
