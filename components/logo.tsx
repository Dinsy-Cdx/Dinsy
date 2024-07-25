import Image from 'next/image'
 
export default function Logo() {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo de la empresa CDX"
      width={50}
      height={55}
    />
  )
}