<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Videojuegos</h1>
                <table border="1">
                    <tr>
                        <th>nombre</th>
                        <th>empresa</th>
                        <th>plataforma</th>
                        <th>duracion</th>
                        <th>metacritic</th>

                    </tr>
                    <xsl:for-each select="videojuegos/videojuego"> 
                    <tr>
                    <td><xsl:value-of select="nombre"></xsl:value-of></td>
                    <td><xsl:value-of select="empresa"></xsl:value-of></td>
                    <td><xsl:value-of select="plataforma"></xsl:value-of></td>
                    <td><xsl:value-of select="duracion"></xsl:value-of></td>
                    <td><xsl:value-of select="metacritic"></xsl:value-of></td>

                    </tr>
                    </xsl:for-each>
                </table>
               

            
            </body>
        </html>



    </xsl:template>
</xsl:stylesheet>