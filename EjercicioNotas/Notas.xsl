<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Notas de Evaluación</title>
            </head>
            <body>
                <h2>Notas de Evaluación</h2>
                <table>
                    <!-- Encabezado de columnas -->
                    <tr>
                        <xsl:for-each select="notas/nota[numero!='Media']">
                            <th><xsl:value-of select="numero"/></th>
                        </xsl:for-each>
                        <th>Media</th>
                    </tr>
                    <!-- Filas de datos -->
                    <tr>
                        <xsl:for-each select="notas/nota[numero!='Media']">
                            <td><xsl:value-of select="resultado1"/></td>
                        </xsl:for-each>
                        <!-- Cálculo de la media para resultado1 -->
                        <td class="media">
                            <xsl:variable name="totalNotas" select="count(notas/nota[numero!='Media'])"/>
                            <xsl:value-of select="format-number(sum(notas/nota[numero!='Media']/resultado1) div $totalNotas, '0.00')"/>
                        </td>
                    </tr>
                    <tr>
                        <xsl:for-each select="notas/nota[numero!='Media']">
                            <td><xsl:value-of select="resultado2"/></td>
                        </xsl:for-each>
                        <!-- Cálculo de la media para resultado2 -->
                        <td class="media">
                            <xsl:variable name="totalNotas" select="count(notas/nota[numero!='Media'])"/>
                            <xsl:value-of select="format-number(sum(notas/nota[numero!='Media']/resultado2) div $totalNotas, '0.00')"/>
                        </td>
                    </tr>
                    <tr>
                        <xsl:for-each select="notas/nota[numero!='Media']">
                            <td><xsl:value-of select="resultado3"/></td>
                        </xsl:for-each>
                        <!-- Cálculo de la media para resultado3 -->
                        <td class="media">
                            <xsl:variable name="totalNotas" select="count(notas/nota[numero!='Media'])"/>
                            <xsl:value-of select="format-number(sum(notas/nota[numero!='Media']/resultado3) div $totalNotas, '0.00')"/>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
