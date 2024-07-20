import Image from "next/image";

const Logo = () => {
    return ( 
        <div>
            <Image
            width={130}
            height={130}
            alt="logo image"
            src={`/logo.svg`}/>
        </div>
     );
}
 
export default Logo;