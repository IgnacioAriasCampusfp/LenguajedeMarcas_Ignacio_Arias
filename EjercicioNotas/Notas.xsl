<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <html>
      <body>
        <h1>Listado de notas</h1>
        <table border="1">
        <tr>
          <td>Nota 1</td>
          <td>Nota 2</td>
          <td>Nota 3</td>
          <td>Media</td>
        </tr>
        <xsl:for-each select="notas/nota">
          <tr>
            <td><xsl:value-of select="nota1"/></td>
            <td><xsl:value-of select="nota2"/></td>
            <td><xsl:value-of select="nota3"/></td>
            <td><xsl:value-of select="format-number(sum(nota1+nota1+nota1) div 3, '0.00')"/></td>
          </tr>
        </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>