import { Link } from "react-router-dom";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import { siteConfig, fullAddress } from "@/config/site";

const AvisoLegal = () => (
  <LegalPage
    eyebrow="Información legal"
    title="Aviso Legal"
    intro="Condiciones generales de uso de este sitio web y datos identificativos de su titular, conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)."
    updatedAt="31 de julio de 2026"
  >
    <LegalSection title="1. Datos identificativos del titular">
      <ul>
        <li><strong>Titular:</strong> {siteConfig.legal.companyName}</li>
        <li><strong>Nombre comercial:</strong> {siteConfig.name}</li>
        <li><strong>NIF:</strong> {siteConfig.legal.taxId}</li>
        <li><strong>Domicilio:</strong> {siteConfig.legal.registeredAddress}</li>
        <li><strong>Establecimiento abierto al público:</strong> {fullAddress}</li>
        <li><strong>Datos registrales:</strong> {siteConfig.legal.registryInfo}</li>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
        </li>
        <li>
          <strong>Teléfono:</strong>{" "}
          <a href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phone}</a>
        </li>
        <li><strong>Sitio web:</strong> {siteConfig.url}</li>
      </ul>
    </LegalSection>

    <LegalSection title="2. Objeto y condiciones de uso">
      <p>
        Este sitio web tiene por objeto informar sobre los servicios de estética y bienestar que
        presta {siteConfig.name}, así como facilitar el contacto y la reserva de citas. El acceso al
        sitio es gratuito y atribuye la condición de usuario, lo que implica la aceptación de este
        aviso legal.
      </p>
      <p>
        El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para
        actividades ilícitas, lesivas de derechos de terceros o que puedan dañar, sobrecargar o
        impedir el normal funcionamiento del sitio.
      </p>
    </LegalSection>

    <LegalSection title="3. Servicios, precios y reservas">
      <p>
        Los precios y promociones publicados son orientativos, incluyen el IVA aplicable y pueden
        variar en función del estado y las necesidades concretas de cada persona, que se valoran en
        cabina. Las promociones tienen la vigencia y las condiciones que se indican expresamente en
        cada una de ellas y no son acumulables salvo indicación en contrario.
      </p>
      <p>
        Las reservas realizadas a través de plataformas externas, como Treatwell, se rigen además
        por las condiciones propias de dichas plataformas.
      </p>
    </LegalSection>

    <LegalSection title="4. Propiedad intelectual e industrial">
      <p>
        Todos los contenidos del sitio (textos, fotografías, diseño gráfico, código fuente, logotipos
        y marcas) son titularidad de {siteConfig.legal.companyName} o de terceros que han autorizado
        su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda
        prohibida su reproducción, distribución, comunicación pública o transformación sin
        autorización expresa y por escrito.
      </p>
      <p>
        Las fotografías de trabajos realizados publicadas en la galería se difunden con el
        consentimiento de las personas afectadas cuando estas resultan identificables.
      </p>
    </LegalSection>

    <LegalSection title="5. Enlaces a sitios de terceros">
      <p>
        Este sitio contiene enlaces a páginas de terceros (redes sociales, plataformas de reserva,
        mapas). No nos responsabilizamos de sus contenidos ni de sus políticas de privacidad, cuyo
        cumplimiento corresponde exclusivamente a sus titulares.
      </p>
    </LegalSection>

    <LegalSection title="6. Responsabilidad y disponibilidad">
      <p>
        Procuramos que la información publicada sea exacta y esté actualizada, pero no podemos
        garantizar la ausencia de errores tipográficos ni la disponibilidad ininterrumpida del sitio,
        que puede suspenderse por tareas de mantenimiento o causas ajenas a nuestra voluntad. La
        información de la web no sustituye en ningún caso al diagnóstico o consejo de un profesional
        sanitario.
      </p>
    </LegalSection>

    <LegalSection title="7. Protección de datos y cookies">
      <p>
        El tratamiento de los datos personales se describe en nuestra{" "}
        <Link to="/privacidad">Política de Privacidad</Link>, y el uso de cookies y contenido
        incrustado en la <Link to="/cookies">Política de Cookies</Link>.
      </p>
    </LegalSection>

    <LegalSection title="8. Legislación aplicable">
      <p>
        Este aviso legal se rige por la legislación española. Para la resolución de cualquier
        controversia, las partes se someten a los juzgados y tribunales del domicilio del
        consumidor. Puedes acudir asimismo a la plataforma europea de resolución de litigios en
        línea disponible en{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>
    </LegalSection>
  </LegalPage>
);

export default AvisoLegal;
