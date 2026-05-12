export const legal = {
  aviso: {
    title: "Aviso Legal",
    body: `En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico, este sitio web es titularidad de Urban French Takos, con domicilio en Calle de la Virgen, 60, Local 2, Valdepeñas (Ciudad Real).

El uso de este sitio web implica la aceptación plena y sin reservas de las disposiciones del presente Aviso Legal. Urban French Takos se reserva el derecho a modificar, suprimir o actualizar el contenido del sitio web sin previo aviso.

Todos los contenidos, marcas, logotipos, imágenes y textos son propiedad de Urban French Takos o de terceros que han autorizado su uso. Queda prohibida la reproducción total o parcial sin autorización expresa.`,
  },
  privacidad: {
    title: "Política de Privacidad",
    body: `Tus datos personales se tratan conforme al Reglamento (UE) 2016/679 (RGPD) y a la LOPDGDD 3/2018.

Responsable: Urban French Takos · Calle de la Virgen, 60, Local 2, Valdepeñas.
Finalidad: gestionar tu solicitud de información, pedidos o candidatura de franquicia.
Legitimación: consentimiento del interesado.
Destinatarios: no se cederán datos a terceros salvo obligación legal.
Derechos: podrás ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiéndonos al local indicado.

Conservamos tus datos durante el tiempo necesario para cumplir la finalidad para la que se recogieron y, en su caso, durante los plazos legales aplicables.`,
  },
  cookies: {
    title: "Política de Cookies",
    body: `Este sitio utiliza cookies técnicas necesarias para el correcto funcionamiento del sitio web y, opcionalmente, cookies de análisis para entender cómo se usa la página y mejorarla.

Puedes aceptar, rechazar o configurar las cookies desde el banner que aparece la primera vez que visitas el sitio. También puedes eliminar las cookies almacenadas en tu navegador desde la configuración del mismo.

Para más información, contacta con nosotros en Calle de la Virgen, 60, Local 2, Valdepeñas.`,
  },
} as const;

export type LegalKey = keyof typeof legal;
