import { Link } from "react-router-dom";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";
import { siteConfig, fullAddress } from "@/config/site";

const Privacidad = () => (
  <LegalPage
    eyebrow="Protección de datos"
    title="Política de Privacidad"
    intro="Te explicamos con transparencia qué datos personales tratamos, para qué los usamos, cuánto tiempo los conservamos y cómo puedes ejercer tus derechos."
    updatedAt="31 de julio de 2026"
  >
    <LegalSection title="1. Responsable del tratamiento">
      <ul>
        <li><strong>Titular:</strong> {siteConfig.legal.companyName} ({siteConfig.name})</li>
        <li><strong>NIF:</strong> {siteConfig.legal.taxId}</li>
        <li><strong>Domicilio:</strong> {siteConfig.legal.registeredAddress}</li>
        <li><strong>Establecimiento:</strong> {fullAddress}</li>
        <li>
          <strong>Email de contacto en materia de protección de datos:</strong>{" "}
          <a href={`mailto:${siteConfig.contact.privacyEmail}`}>{siteConfig.contact.privacyEmail}</a>
        </li>
        <li><strong>Teléfono:</strong> {siteConfig.contact.phone}</li>
      </ul>
      <p>
        Tratamos tus datos conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de
        Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>
    </LegalSection>

    <LegalSection title="2. Qué datos tratamos y con qué finalidad">
      <p>
        Solo tratamos los datos que nos facilitas voluntariamente. No recogemos datos de forma
        automática con fines publicitarios ni elaboramos perfiles.
      </p>
      <ul>
        <li>
          <strong>Formulario de contacto:</strong> nombre, dirección de email y el contenido de tu
          consulta. Finalidad: atender y responder a tu solicitud de información o de cita.
          <br />
          <em>Base jurídica:</em> tu consentimiento (art. 6.1.a RGPD), que otorgas al marcar la
          casilla de aceptación antes de enviar el formulario.
        </li>
        <li>
          <strong>Gestión de citas y clientela:</strong> nombre, teléfono, email, servicio
          solicitado, fecha y hora y las observaciones que nos indiques.
          <br />
          <em>Base jurídica:</em> ejecución de la relación contractual o de medidas precontractuales
          a petición tuya (art. 6.1.b RGPD) y cumplimiento de obligaciones legales, en especial
          contables y fiscales (art. 6.1.c RGPD).
        </li>
        <li>
          <strong>Comunicaciones por WhatsApp, teléfono o redes sociales:</strong> los datos que nos
          facilites en la conversación, con la única finalidad de atenderte.
          <br />
          <em>Base jurídica:</em> tu consentimiento y el interés legítimo en atender a quien nos
          contacta (arts. 6.1.a y 6.1.f RGPD).
        </li>
      </ul>
      <p>
        No es necesario que nos facilites datos de categorías especiales (por ejemplo, información
        sobre tu salud). Te pedimos que no los incluyas en el formulario; si necesitamos conocer
        alguna condición relevante para la seguridad de un tratamiento, te lo preguntaremos en el
        propio centro.
      </p>
      <p>
        Esta web <strong>no elabora perfiles, no envía comunicaciones comerciales automatizadas y no
        realiza pagos en línea</strong>. Las reservas se gestionan por teléfono, WhatsApp o a través
        de Treatwell.
      </p>
    </LegalSection>

    <LegalSection title="2 bis. Contenidos publicados en la web">
      <ul>
        <li>
          <strong>Opiniones de clientas.</strong> Publicamos reseñas con el nombre de pila (o nombre
          e inicial), la valoración y el servicio recibido. Proceden de reseñas que las propias
          personas han publicado en plataformas públicas o que nos han autorizado a difundir.
          <br />
          <em>Base jurídica:</em> consentimiento e interés legítimo en mostrar la valoración de
          nuestro trabajo (arts. 6.1.a y 6.1.f RGPD). Si aparece una opinión tuya y prefieres que la
          retiremos, escríbenos y la eliminaremos sin necesidad de justificación.
        </li>
        <li>
          <strong>Fotografías del equipo.</strong> Mostramos el nombre, la fotografía y la
          especialidad de las profesionales del centro, con su consentimiento y en el marco de la
          relación laboral.
        </li>
        <li>
          <strong>Galería de trabajos.</strong> Son fotografías de manicuras, pedicuras y
          tratamientos realizados. Cuando en una imagen resulta identificable una persona, se
          publica únicamente con su consentimiento previo, que puede retirarse en cualquier momento.
        </li>
      </ul>
    </LegalSection>

    <LegalSection title="3. Durante cuánto tiempo conservamos tus datos">
      <ul>
        <li>
          <strong>Mensajes del formulario de contacto:</strong> se conservan un máximo de{" "}
          {siteConfig.retention.contactMessagesMonths} meses desde la última comunicación, y se
          eliminan después de forma automática.
        </li>
        <li>
          <strong>Datos de citas y facturación:</strong> durante la relación con el centro y,
          después, durante los plazos de prescripción legal (hasta{" "}
          {siteConfig.retention.bookingsYears} años en el caso de las obligaciones mercantiles y
          fiscales).
        </li>
      </ul>
      <p>Transcurridos esos plazos, los datos se suprimen o se anonimizan.</p>
    </LegalSection>

    <LegalSection title="4. Destinatarios y encargados de tratamiento">
      <p>
        No vendemos ni cedemos tus datos a terceros con fines comerciales. Únicamente acceden a
        ellos los proveedores que nos prestan servicios tecnológicos, con contrato de encargo de
        tratamiento firmado conforme al art. 28 RGPD:
      </p>
      <ul>
        {siteConfig.processors.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong> — {p.purpose}. Ubicación: {p.location}.{" "}
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              Ver su política de privacidad
            </a>
            .
          </li>
        ))}
      </ul>
      <p>
        En las transferencias internacionales de datos que puedan producirse, los proveedores
        aplican Cláusulas Contractuales Tipo aprobadas por la Comisión Europea o se acogen al Marco
        de Privacidad de Datos UE-EE. UU. También podemos comunicar datos a las Administraciones
        Públicas cuando exista una obligación legal.
      </p>
    </LegalSection>

    <LegalSection title="5. Tus derechos">
      <p>
        Puedes ejercer de forma gratuita los derechos de <strong>acceso</strong>,{" "}
        <strong>rectificación</strong>, <strong>supresión</strong>, <strong>oposición</strong>,{" "}
        <strong>limitación del tratamiento</strong> y <strong>portabilidad</strong>, así como
        retirar en cualquier momento el consentimiento prestado (sin que ello afecte a la licitud
        del tratamiento previo).
      </p>
      <p>
        Para ello, escríbenos a{" "}
        <a href={`mailto:${siteConfig.contact.privacyEmail}`}>{siteConfig.contact.privacyEmail}</a> o
        acude a nuestro establecimiento en {fullAddress}, indicando el derecho que deseas ejercer y
        acompañando una copia de tu documento de identidad. Responderemos en el plazo máximo de un
        mes.
      </p>
      <p>
        Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una
        reclamación ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          www.aepd.es
        </a>
        , C/ Jorge Juan 6, 28001 Madrid).
      </p>
    </LegalSection>

    <LegalSection title="6. Seguridad de la información">
      <p>
        Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos: cifrado del
        tráfico mediante HTTPS, políticas de seguridad a nivel de fila en la base de datos que
        impiden el acceso público a los datos de clientes, acceso restringido al personal autorizado
        mediante autenticación, política de seguridad de contenidos y cabeceras de seguridad en el
        servidor, y minimización de los datos que se solicitan.
      </p>
    </LegalSection>

    <LegalSection title="7. Menores de edad">
      <p>
        Los servicios de esta web se dirigen a mayores de 14 años. Los tratamientos a menores de esa
        edad se realizan siempre en el centro con la autorización de quienes ejerzan la patria
        potestad o tutela.
      </p>
    </LegalSection>

    <LegalSection title="8. Cookies y tecnologías similares">
      <p>
        Esta web no utiliza cookies publicitarias ni de analítica. Puedes consultar el detalle en
        nuestra <Link to="/cookies">Política de Cookies</Link>.
      </p>
    </LegalSection>
  </LegalPage>
);

export default Privacidad;
