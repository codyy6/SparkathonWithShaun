import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import Logo from "../images/survowlLogo.png";
import gnosisLogo from "../images/gnosisLogo.png";
import "./landing.css";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new BrowserProvider(window.ethereum);

let address;

const BACKEND_ADDR = "http://localhost:3000";

async function createSiweMessage(address, statement) {
  const res = await fetch(`${BACKEND_ADDR}/nonce`, {
      credentials: 'include',
  });
  const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: '1',
      nonce: await res.text()
  });
  return message.prepareMessage();
}

function Main() {
  const navigate = useNavigate(); // Access the useNavigate hook within the component

  async function SignInWithEthereum() {
    const signer = await provider.getSigner();

    address = await signer.getAddress()
    const message = await createSiweMessage(
      address,
      'Sign in with Ethereum to the app.'
    );

    try {
      const signature = await signer.signMessage(message);

      // Handle the successful signature
      const res = await fetch(`${BACKEND_ADDR}/verify`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
        credentials: 'include'
      });

      if (!res.ok) {
        console.error(`Failed in getInformation:`);
        // Handle the error response from the server
      } else {
        navigate('/home') // Use the navigate function for redirection
      }
      console.log(await res.text());
    } catch (error) {
      console.error('Signature request was rejected or failed:', error);
    }
  }

  return (
    <div className='container'>
      <div className='center'>
        <img src={Logo} alt='Logo' />
      </div>
      <div className='center'>
        <p onClick={SignInWithEthereum} className='connect'>
          Connect Wallet
        </p>
        <img src={gnosisLogo} alt='Gnosis Logo' className='gnosis' />
      </div>
    </div>
  );
}

export default Main;