/**
 * @class Ext.chart.series.Pie3D
 * @extends Ext.chart.series.Polar
 *
 * Creates a 3D Pie Chart.
 *
 * **Note:** Labels, legends, and lines are not currently available when using the
 * 3D Pie chart series.
 *
 *     @example
 *     Ext.create({
 *        xtype: 'polar', 
 *        renderTo: document.body,
 *        width: 600,
 *        height: 400,
 *        theme: 'green',
 *        interactions: 'rotate',
 *        store: {
 *            fields: ['data3'],
 *            data: [{
 *                'data3': 14
 *            }, {
 *                'data3': 16
 *            }, {
 *                'data3': 14
 *            }, {
 *                'data3': 6
 *            }, {
 *                'data3': 36
 *            }]
 *        },
 *        series: {
 *            type: 'pie3d',
 *            angleField: 'data3',
 *            donut: 30
 *        }
 *     });
 */
Ext.define('Ext.chart.series.Pie3D', {
    requires: ['Ext.chart.series.sprite.Pie3DPart'],
    extend: 'Ext.chart.series.Polar',
    type: 'pie3d',
    seriesType: 'pie3d',
    alias: 'series.pie3d',
    config: {
        rect: [0, 0, 0, 0],
        thickness: 35,
        distortion: 0.5,

        /**
         * @cfg {String} angleField (required)
         * The store record field name to be used for the pie angles.
         * The values bound to this field name must be positive real numbers.
         */

        /**
         * @private
         * @cfg {String} radiusField
         * Not supported.
         */

        /**
         * @cfg {Boolean/Number} donut
         * Whether to set the pie chart as donut chart.
         * Can be set to a particular percentage to set the radius
         * of the donut chart.
         */
        donut: false,

        /**
         * @cfg {Array} hidden Determines which pie slices are hidden.
         */
        hidden: [] // Populated by the coordinateX method.

        /**
         * @cfg {Number} [rotation=0] The starting angle of the pie slices.
         */,

        /**
         * @private
         * @cfg {Boolean/Object} [shadow=false]
         */
        shadow: false
    },

    spritesPerSlice: 8,

    // Subtract 90 degrees from rotation, so that `rotation` config's default
    // zero value makes first pie sector start at noon, rather than 3 o'clock.
    rotationOffset: -Math.PI / 2,

    setField: function (value) {
        return this.setXField(value);
    },

    getField: function () {
        return this.getXField();
    },

    updateRotation: function (rotation) {
        this.setStyle({
            baseRotation: rotation + this.rotationOffset
        });
        this.doUpdateStyles();
    },

    updateColors: function (colors) {
        this.setSubStyle({baseColor: colors});
    },

    applyShadow: function (shadow) {
        if (shadow === true) {
            shadow = {
                shadowColor: 'rgba(0,0,0,0.8)',
                shadowBlur: 30
            };
        } else if (!Ext.isObject(shadow)) {
            shadow = {
                shadowColor: Ext.draw.Color.RGBA_NONE
            };
        }

        return shadow;
    },

    updateShadow: function (shadow) {
        var me = this,
            sprites = me.getSprites(),
            spritesPerSlice = me.spritesPerSlice,
            ln = sprites && sprites.length,
            i, sprite;

        for (i = 1; i < ln; i += spritesPerSlice) {
            sprite = sprites[i];
            if (sprite.attr.part = 'bottom') {
                sprite.setAttributes(shadow);
            }
        }
    },

    // This is a temporary solution until the Series.getStyleByIndex is fixed
    // to give user styles the priority over theme ones. Also, for sprites of
    // this particular series, the fillStyle shouldn't be set directly. Instead,
    // the 'baseColor' attribute should be set, from which the stops of the
    // gradient (used for fillStyle) will be calculated. Themes can't handle
    // situations like that properly.
    getStyleByIndex: function (i) {
        var indexStyle = this.callParent([i]),
            style = this.getStyle(),
            // 'fill' and 'color' are 'fillStyle' aliases
            // (see Ext.draw.sprite.Sprite.inheritableStatics.def.aliases)
            fillStyle = indexStyle.fillStyle || indexStyle.fill || indexStyle.color,
            strokeStyle = style.strokeStyle || style.stroke;

        if (fillStyle) {
            indexStyle.baseColor = fillStyle;
            delete indexStyle.fillStyle;
            delete indexStyle.fill;
            delete indexStyle.color;
        }
        if (strokeStyle) {
            indexStyle.strokeStyle = strokeStyle;
        }

        return indexStyle;
    },

    doUpdateStyles: function () {
        var me = this,
            sprites = me.getSprites(),
            spritesPerSlice = me.spritesPerSlice,
            ln = sprites && sprites.length,
            i = 0, j = 0, k,
            style;

        for (; i < ln; i += spritesPerSlice, j++) {
            style = me.getStyleByIndex(j);
            for (k = 0; k < spritesPerSlice; k++) {
                sprites[i + k].setAttributes(style);
            }
        }
    },

    coordinateX: function () {
        var me = this,
            chart = me.getChart(),
            animation = chart && chart.getAnimation(),
            store = me.getStore(),
            records = store.getData().items,
            recordCount = records.length,
            xField = me.getXField(),
            rotation = me.getRotation(),
            hidden = me.getHidden(),
            value, sum = 0, ratio,
            summation = [],
            sprites = me.getSprites(),
            spriteCount = sprites.length,
            spritesPerSlice = me.spritesPerSlice,
            lastAngle = 0,
            twoPi = Math.PI * 2,
            // To avoid adjacent start/end part blinking (z-index jitter)
            // when rotating a translucent pie chart.
            delta = 1e-10,
            i, j;

        for (i = 0; i < recordCount; i++) {
            value = Math.abs(Number(records[i].get(xField))) || 0;
            if (!hidden[i]) {
                sum += value;
            }
            summation[i] = sum;
            if (i >= hidden.length) {
                hidden[i] = false;
            }
        }
        hidden.length = recordCount;

        if (sum === 0) {
            return;
        }
        ratio = 2 * Math.PI / sum;
        for (i = 0; i < recordCount; i++) {
            summation[i] *= ratio;
        }

        for (i = 0; i < spriteCount; i++) {
            sprites[i].fx.setConfig(animation);
        }

        for (i = 0; i < recordCount; i++) {
            for (j = 0; j < spritesPerSlice; j++) {
                sprites[i * spritesPerSlice + j].setAttributes({
                    startAngle: lastAngle,
                    endAngle: summation[i] - delta,
                    globalAlpha: 1,
                    baseRotation: rotation
                });
            }
            lastAngle = summation[i];
        }

        for (i *= spritesPerSlice; i < spriteCount; i++) {
            sprites[i].fx.setConfig(animation);
            sprites[i].setAttributes({
                startAngle: twoPi,
                endAngle: twoPi,
                globalAlpha: 0,
                baseRotation: rotation
            });
        }
    },

    updateLabelData: function () {
        var me = this,
            store = me.getStore(),
            items = store.getData().items,
            sprites = me.getSprites(),
            labelField = me.getLabel().getTemplate().getField(),
            hidden = me.getHidden(),
            spritesPerSlice = me.spritesPerSlice,
            i, j, ln, labels, sprite;

        if (sprites.length && labelField) {
            labels = [];
            for (i = 0, ln = items.length; i < ln; i++) {
                labels.push(items[i].get(labelField));
            }
            // Only set labels for the sprites that compose the top lid of the pie.
            for (i = 0, j = 0, ln = sprites.length; i < ln; i += spritesPerSlice, j++) {
                sprite = sprites[i];
                sprite.setAttributes({label: labels[j]});
                sprite.putMarker('labels', {hidden: hidden[j]}, sprite.attr.attributeId);
            }
        }
    },

    // The radius here will normally be set by the PolarChart.performLayout,
    // where it's half the width or height (whichever is smaller) of the chart's rect.
    // But for 3D pie series we have to take the thickness of the pie and the
    // distortion into account to calculate the proper radius.
    // The passed value is never used (or derived from) since the radius config
    // is not really meant to be used directly, as it will be reset by the next layout.
    applyRadius: function () {
        var me = this,
            chart = me.getChart(),
            padding = chart.getInnerPadding(),
            rect = chart.getMainRect() || [0, 0, 1, 1],
            width = rect[2] - padding * 2,
            height = (rect[3] - padding * 2 - me.getThickness() * 2) / me.getDistortion();

        return Math.min(width, height) * 0.5;
    },

    getSprites: function () {
        var me = this,
            store = me.getStore();

        if (!store) {
            return [];
        }

        var chart = me.getChart(),
            surface = me.getSurface(),
            records = store.getData().items,
            spritesPerSlice = me.spritesPerSlice,
            recordCount = records.length,
            animation = me.getAnimation() || chart && chart.getAnimation(),
            center = me.getCenter(),
            offsetX = me.getOffsetX(),
            offsetY = me.getOffsetY(),
            radius = me.getRadius(),
            rotation = me.getRotation(),
            commonAttributes = {
                centerX: center[0] + offsetX,
                centerY: center[1] + offsetY - me.getThickness() / 2,
                endRho: radius,
                startRho: radius * me.getDonut() / 100,
                thickness: me.getThickness(),
                distortion: me.getDistortion()
            }, sliceAttributes, twoPie = Math.PI * 2,
            sprites = me.sprites,
            label = me.getLabel(),
            labelTpl = label.getTemplate(),
            topSprite, bottomSprite,
            startSprite, endSprite,
            innerFrontSprite, innerBackSprite,
            outerFrontSprite, outerBackSprite,
            i;

        for (i = 0; i < recordCount; i++) {
            sliceAttributes = Ext.apply({}, this.getStyleByIndex(i), commonAttributes);
            topSprite = sprites[i * spritesPerSlice];
            if (!topSprite) {
                topSprite = surface.add({
                    type: 'pie3dPart',
                    part: 'top',
                    startAngle: twoPie,
                    endAngle: twoPie
                });
                if (labelTpl.getField()) {
                    topSprite.bindMarker('labels', label);
                }
                bottomSprite = surface.add({
                    type: 'pie3dPart',
                    part: 'bottom',
                    startAngle: twoPie,
                    endAngle: twoPie
                });
                startSprite = surface.add({
                    type: 'pie3dPart',
                    part: 'start',
                    startAngle: twoPie,
                    endAngle: twoPie
                });
                endSprite = surface.add({
                    type: 'pie3dPart',
                    part: 'end',
                    startAngle: twoPie,
                    endAngle: twoPie
                });
                innerFrontSprite = surface.add({
                    type: 'pie3dPart',
                    part: 'innerFront',
                    startAngle: twoPie,
                    endAngle: twoPie,
                    thickness: 0
                });
                innerBackSprite = surface.add({
                    type: 'pie3dPart',
                    part: 'innerBack',
                    startAngle: twoPie,
                    endAngle: twoPie,
                    thickness: 0
                });
                outerFrontSprite = surface.add({
                    type: 'pie3dPart',
                    part: 'outerFront',
                    startAngle: twoPie,
                    endAngle: twoPie,
                    thickness: 0
                });
                outerBackSprite = surface.add({
                    type: 'pie3dPart',
                    part: 'outerBack',
                    startAngle: twoPie,
                    endAngle: twoPie,
                    thickness: 0
                });

                topSprite.fx.setDurationOn('baseRotation', rotation);
                bottomSprite.fx.setDurationOn('baseRotation', rotation);
                startSprite.fx.setDurationOn('baseRotation', rotation);
                endSprite.fx.setDurationOn('baseRotation', rotation);
                innerFrontSprite.fx.setDurationOn('baseRotation', rotation);
                innerBackSprite.fx.setDurationOn('baseRotation', rotation);
                outerFrontSprite.fx.setDurationOn('baseRotation', rotation);
                outerBackSprite.fx.setDurationOn('baseRotation', rotation);

                sprites.push(
                    topSprite, bottomSprite,
                    startSprite, endSprite,
                    innerFrontSprite, innerBackSprite,
                    outerFrontSprite, outerBackSprite
                );
            } else {
                bottomSprite = sprites[i * spritesPerSlice + 1];
                startSprite = sprites[i * spritesPerSlice + 2];
                endSprite = sprites[i * spritesPerSlice + 3];
                innerFrontSprite = sprites[i * spritesPerSlice + 4];
                innerBackSprite = sprites[i * spritesPerSlice + 5];
                outerFrontSprite = sprites[i * spritesPerSlice + 6];
                outerBackSprite = sprites[i * spritesPerSlice + 7];

                if (animation) {
                    topSprite.fx.setConfig(animation);
                    bottomSprite.fx.setConfig(animation);
                    startSprite.fx.setConfig(animation);
                    endSprite.fx.setConfig(animation);
                    innerFrontSprite.fx.setConfig(animation);
                    innerBackSprite.fx.setConfig(animation);
                    outerFrontSprite.fx.setConfig(animation);
                    outerBackSprite.fx.setConfig(animation);
                }
            }
            topSprite.setAttributes(sliceAttributes);
            bottomSprite.setAttributes(sliceAttributes);
            startSprite.setAttributes(sliceAttributes);
            endSprite.setAttributes(sliceAttributes);
            innerFrontSprite.setAttributes(sliceAttributes);
            innerBackSprite.setAttributes(sliceAttributes);
            outerFrontSprite.setAttributes(sliceAttributes);
            outerBackSprite.setAttributes(sliceAttributes);
        }

        return sprites;
    },

    betweenAngle: function (x, a, b) {
        var pp = Math.PI * 2,
            offset = this.rotationOffset;

        a += offset;
        b += offset;

        x -= a;
        b -= a;

        // Normalize, so that both x and b are in the [0,360) interval.
        // Since 360 * n angles will be normalized to 0,
        // we need to treat b === 0 as a special case.
        x %= pp;
        b %= pp;
        x += pp;
        b += pp;
        x %= pp;
        b %= pp;

        return x < b || b === 0;
    },

    getItemForPoint: function (x, y) {
        var me = this,
            store = me.getStore(),
            items = store.getData().items,
            spritesPerSlice = me.spritesPerSlice,
            sprites = me.getSprites(),
            attr,
            centerX, centerY,
            center = me.getCenter(),
            offsetX = me.getOffsetX(),
            offsetY = me.getOffsetY(),
            distortion = me.getDistortion(),
            originalX = x - center[0] + offsetX,
            originalY = y - center[1] + offsetY - me.getThickness() / 2,
            direction = Math.atan2(originalY, originalX) - me.getRotation(),
            radius = Math.sqrt(originalX * originalX + originalY * originalY),
            sprite, startAngle, endAngle,
            startRho, endRho,
            minRho, maxRho;

        if (sprites) {
            for (var i = 0, j = 0; i < items.length; i++, j += spritesPerSlice) {
                sprite = sprites[j];
                attr = sprite.attr;

                //centerX = attr.centerX;
                //centerY = attr.centerY;
                startAngle = attr.startAngle;
                endAngle = attr.endAngle;
                startRho = attr.startRho;
                endRho = attr.endRho;

                //minRho =
            }
        }
    },

    provideLegendInfo: function (target) {
        var me = this,
            store = me.getStore();

        if (store) {
            var items = store.getData().items,
                labelField = me.getLabel().getTemplate().getField(),
                field = me.getField(),
                hidden = me.getHidden(),
                i, style, color;

            for (i = 0; i < items.length; i++) {
                style = me.getStyleByIndex(i);
                color = style.baseColor;
                target.push({
                    name: labelField ? String(items[i].get(labelField))  : field + ' ' + i,
                    mark: color || 'black',
                    disabled: hidden[i],
                    series: me.getId(),
                    index: i
                });
            }
        }
    }
});
