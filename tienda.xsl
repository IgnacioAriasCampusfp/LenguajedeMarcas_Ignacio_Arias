<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
      <html>
        <body>
            <h1>Tienda carnica</h1>
            <table border="1">
                    <tr>
                        <th>Nombre</th>
                        <th>Precio sin IVA</th>
                        <th>Descripcion</th>
                        <th>Stock</th>
                        <th>IVA</th>
                        <th>Precio con IVA</th>
                    </tr>
                    <xsl:for-each select="tienda/producto"> 
                        <tr>
                            <td><xsl:value-of select="nombre"></xsl:value-of></td>
                            <td><xsl:value-of select="pvp"></xsl:value-of>€</td>
                            <td><xsl:value-of select="descripcion"></xsl:value-of></td>
                            <td><xsl:value-of select="stock"></xsl:value-of></td>
                            <td><xsl:value-of select="iva"></xsl:value-of>%</td>
                            <td><xsl:value-of select="(pvp * iva div 100) + pvp" />€</td>
                        </tr>
                    </xsl:for-each>
                </table>
        </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
