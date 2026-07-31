import { Link } from "react-router-dom";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import { openCookiePreferences } from "@/lib/consent";
import { siteConfig } from "@/config/site";

const Cookies = () => (
  <LegalPage
    eyebrow="Transparencia"
    title="Política de Cookies"
    intro="Esta web funciona sin cookies de publicidad, de analítica ni de perfilado. Aquí te contamos exactamente qué se almacena en tu dispositivo y por qué."
    updatedAt="31 de julio de 2026"
  >
    <LegalSection title="1. Qué son las cookies y tecnologías similares">
      <p>
        Una cookie es un pequeño archivo que un sitio web guarda en tu navegador. La normativa
        española (art. 22.2 LSSI-CE) equipara a las cookies otras formas de almacenamiento en el
        dispositivo, como el <em>localStorage</em>, que es la que utiliza esta web.
      </p>
    </LegalSection>

    <LegalSection title="2. Qué almacenamos nosotros">
      <p>
        Solo utilizamos almacenamiento <strong>técnico y necesario</strong>, exento de
        consentimiento porque es imprescindible para prestar el servicio que solicitas:
      </p>
      <ul>
        <li>
          <strong>manipedi.consent</strong> — guarda tu decisión sobre el contenido externo, para no
          volver a preguntártelo. Duración: 12 meses. Almacenamiento local, no se envía a ningún
          servidor.
        </li>
      </ul>
      <p>
        Eso es todo. La web no instala ninguna otra cookie ni almacena nada más en tu dispositivo.
      </p>
      <p>
        <strong>No usamos</strong> Google Analytics, píxel de Meta, cookies publicitarias, mapas de
        calor ni ninguna herramienta que elabore perfiles sobre ti.
      </p>
    </LegalSection>

    <LegalSection title="3. Contenido de terceros sujeto a tu consentimiento">
      <ul>
        <li>
          <strong>Google Maps</strong> — el mapa con nuestra ubicación solo se carga si lo aceptas.
          Al hacerlo, Google puede instalar cookies propias y recibir tu dirección IP conforme a su{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            política de privacidad
          </a>
          . Si no lo aceptas, mostramos la dirección y un enlace para abrir el mapa en una ventana
          nueva.
        </li>
        <li>
          <strong>Google Fonts</strong> — las tipografías se sirven desde los servidores de Google,
          que reciben tu dirección IP al descargarlas. No instalan cookies.
        </li>
        <li>
          <strong>Enlaces salientes</strong> — al pulsar en Treatwell, Instagram, Facebook o
          WhatsApp abandonas este sitio y pasas a regirte por las políticas de esas plataformas.
        </li>
      </ul>
    </LegalSection>

    <LegalSection title="4. Cómo gestionar tus preferencias">
      <p>
        Puedes cambiar tu decisión en cualquier momento, sin que ello afecte a la navegación:
      </p>
      <p>
        <button
          type="button"
          onClick={openCookiePreferences}
          className="btn-primary px-6 py-3 text-xs font-black uppercase tracking-[0.15em]"
        >
          Cambiar mis preferencias
        </button>
      </p>
      <p>
        También puedes bloquear o eliminar el almacenamiento desde la configuración de tu navegador
        (Chrome, Firefox, Safari, Edge o el que utilices). Ten en cuenta que si borras los datos del
        navegador volveremos a preguntarte por el contenido externo.
      </p>
    </LegalSection>

    <LegalSection title="5. Más información">
      <p>
        Para saber cómo tratamos tus datos personales consulta la{" "}
        <Link to="/privacidad">Política de Privacidad</Link> o escríbenos a{" "}
        <a href={`mailto:${siteConfig.contact.privacyEmail}`}>{siteConfig.contact.privacyEmail}</a>.
      </p>
    </LegalSection>
  </LegalPage>
);

export default Cookies;
