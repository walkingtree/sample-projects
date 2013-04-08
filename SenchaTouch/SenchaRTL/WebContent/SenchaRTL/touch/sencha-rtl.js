
/*Ext.define('Ext.scroll.ScrollerRtl', {
    override: 'Ext.scroll.Scroller',
    snapToBoundary: function () {
        var position = this.position,
            minPosition = this.getMinPosition(),
            maxPosition = this.getMaxPosition(),
            minX = minPosition.x,
            minY = minPosition.y,
            maxX = maxPosition.x,
            maxY = maxPosition.y,
            tempMinX = minX,
            x = Math.round(position.x),
            y = Math.round(position.y);


        minX = -maxX;
        maxX = -tempMinX;
        if (x < minX) {
            x = minX;
        } else if (x > maxX) {
            x = maxX;
        }

        if (y < minY) {
            y = minY;
        } else if (y > maxY) {
            y = maxY;
        }

        this.scrollTo(x, y);
    },

    getAnimationEasing: function (axis) {

        if (!this.isAxisEnabled(axis)) {
            return null;
        }

        var currentPosition = this.position[axis],
            flickStartPosition = this.flickStartPosition[axis],
            flickStartTime = this.flickStartTime[axis],
            minPosition = this.getMinPosition()[axis],
            maxPosition = this.getMaxPosition()[axis],
            tmpMin = minPosition,
            maxAbsVelocity = this.getMaxAbsoluteVelocity(),
            boundValue = null,
            dragEndTime = this.dragEndTime,
            easing, velocity, duration;


        if (axis == "x") {


            minPosition = -maxPosition;
            maxPosition = -tmpMin;

        }
        if (currentPosition < minPosition) {
            boundValue = minPosition;
        } else if (currentPosition > maxPosition) {
            boundValue = maxPosition;
        }

        // Out of bound, to be pulled back
        if (boundValue !== null) {
            easing = this.getBounceEasing()[axis];
            easing.setConfig({
                startTime: dragEndTime,
                startValue: -currentPosition,
                endValue: -boundValue
            });

            return easing;
        }

        // Still within boundary, start deceleration
        duration = dragEndTime - flickStartTime;

        if (duration === 0) {
            return null;
        }

        velocity = (currentPosition - flickStartPosition) / (dragEndTime - flickStartTime);

        if (velocity === 0) {
            return null;
        }
        if (velocity < -maxAbsVelocity) {
            velocity = -maxAbsVelocity;
        } else if (velocity > maxAbsVelocity) {
            velocity = maxAbsVelocity;
        }

        easing = this.getMomentumEasing()[axis];
        if (axis == "x") {
            easing.setConfig({
                startTime: dragEndTime,
                startValue: -currentPosition,
                startVelocity: -velocity,
                minMomentumValue: 0,
                maxMomentumValue: -minPosition
            });
        } else {
            easing.setConfig({
                startTime: dragEndTime,
                startValue: -currentPosition,
                startVelocity: -velocity,
                minMomentumValue: -maxPosition,
                maxMomentumValue: 0
            });
        }

        return easing;
    },
    onAxisDrag: function (axis, delta) {
        if (!this.isAxisEnabled(axis)) {
            return;
        }

        var flickStartPosition = this.flickStartPosition,
            flickStartTime = this.flickStartTime,
            lastDragPosition = this.lastDragPosition,
            dragDirection = this.dragDirection,
            old = this.position[axis],
            min = this.getMinPosition()[axis],
            max = this.getMaxPosition()[axis],
            tmpMin = min,
            start = this.startPosition[axis],
            last = lastDragPosition[axis],
            current = start - delta,
            lastDirection = dragDirection[axis],
            restrictFactor = this.getOutOfBoundRestrictFactor(),
            startMomentumResetTime = this.getStartMomentumResetTime(),
            now = Ext.Date.now(),
            distance;
        if (axis == "x") {
            min = -max;
            max = -tmpMin;

            if (current < min) {
                distance = current - min;
                current = min + distance * restrictFactor;
            } else if (current > max) {
                current *= restrictFactor;
            }
        } else {
            if (current < min) {
                current *= restrictFactor;
            } else if (current > max) {
                distance = current - max;
                current = max + distance * restrictFactor;
            }
        }



        if (current > last) {
            dragDirection[axis] = 1;
        } else if (current < last) {
            dragDirection[axis] = -1;
        }

        if ((lastDirection !== 0 && (dragDirection[axis] !== lastDirection)) || (now - flickStartTime[axis]) > startMomentumResetTime) {
            flickStartPosition[axis] = old;
            flickStartTime[axis] = now;
        }

        lastDragPosition[axis] = current;
    }
});*/



/*
Ext.define('Ext.scroll.indicator.ScrollPositionRtl', {
    override: 'Ext.scroll.indicator.ScrollPosition',
    updateValue: function (value) {
        var axis = this.getAxis();

        if (this.gapLength === 0) {
            if (value < 1) {
                value = value - 1;
            }
            if (axis == "x") {

                value *= -1;
            }

            this.setOffset(this.barLength * value);

        } else {
            if (axis == "x") {

                //value*=-1
            }
            this.setOffset(this.gapLength * value);
        }
    },
    setLength: function (length) {
        var axis = this.getAxis(),
            scrollOffset = this.barLength,
            barDom = this.barElement.dom,
            element = this.element;

        this.callParent(arguments);

        if (axis === 'x') {
            scrollOffset *= -1;
            barDom.scrollRight = scrollOffset;
            element.setRight(scrollOffset);
        } else {
            barDom.scrollTop = scrollOffset;
            element.setTop(scrollOffset);
        }
    },
});*/

Ext.define('Ext.scroll.ViewRtl', {
    override: 'Ext.scroll.View',

    setIndicatorValue: function (axis, scrollerPosition) {
        if (!this.isAxisEnabled(axis)) {
            return this;
        }

        var scroller = this.getScroller(),
            scrollerMaxPosition = scroller.getMaxPosition()[axis],
            scrollerContainerSize = scroller.getContainerSize()[axis],
            value;
        if (axis === "x") {
            scrollerPosition *= -1
        }
        if (scrollerMaxPosition === 0) {
            value = scrollerPosition / scrollerContainerSize;

            if (scrollerPosition >= 0) {
                value += 1;
            }
        } else {
            if (scrollerPosition > scrollerMaxPosition) {
                value = 1 + ((scrollerPosition - scrollerMaxPosition) / scrollerContainerSize);
            } else if (scrollerPosition < 0) {
                value = scrollerPosition / scrollerContainerSize;
            } else {
                value = scrollerPosition / scrollerMaxPosition;
            }

        }
        this.getIndicators()[axis].setValue(value);
    },
});



Ext.define('Ext.TitleBarRtl', {
    override: 'Ext.TitleBar',

	
    refreshTitlePosition: function () {
        var titleElement = this.titleComponent.renderElement;

        titleElement.setWidth(null);
        titleElement.setLeft(null);

        //set the min/max width of the left button
        var leftBox = this.leftBox,
            leftButton = leftBox.down('button'),
            leftBoxWidth, maxButtonWidth;

        if (leftButton) {
            if (leftButton.getWidth() == null) {
                leftButton.renderElement.setWidth('auto');
            }

            leftBoxWidth = leftBox.renderElement.getWidth();
            maxButtonWidth = this.getMaxButtonWidth();

            if (leftBoxWidth > maxButtonWidth) {
                leftButton.renderElement.setWidth(maxButtonWidth);
            }
        }

        var spacerBox = this.spacer.renderElement.getPageBox(),
            titleBox = titleElement.getPageBox(),
            widthDiff = titleBox.width - spacerBox.width,
            titleLeft = titleBox.left,
            titleRight = titleBox.right,
            halfWidthDiff, leftDiff, rightDiff;

        if (widthDiff > 0) {
            titleElement.setWidth(spacerBox.width);
            halfWidthDiff = widthDiff / 2;
            titleLeft += halfWidthDiff;
            titleRight -= halfWidthDiff;
        }

        leftDiff = spacerBox.left - titleLeft;
        rightDiff = titleRight - spacerBox.right;

        if (leftDiff > 0) {
            titleElement.setRight(-leftDiff);
        } else if (rightDiff > 0) {
            titleElement.setRight(rightDiff);
        }

        titleElement.repaint();
	
    }
    
});


Ext.define('Ext.dataview.NestedListRtl', {
    override: 'Ext.dataview.NestedList',
    config: {
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                duration: 250,
                direction: 'right'
            }
        },
    }
});


Ext.define('Ext.navigation.ViewRtl', {
    override: 'Ext.navigation.View',
    config: {
        layout: {
            type: 'card',
            animation: {
                duration: 300,
                easing: 'ease-out',
                type: 'slide',
                direction: 'right'
            }
        }
	
    }
});


Ext.define('Ext.navigation.BarRtl', {
    override: 'Ext.navigation.Bar',
    
  fromBackButton : false,

    onBackButtonTap: function() {
        this.fireEvent('back', this);
        this.fromBackButton = true;
    },
    
    animate: function(element, config, callback) {
    	
        var me = this,
            animation;

        element.setLeft(0);

        config = Ext.apply(config, {
            element: element,
            easing: 'ease-in-out',
            
            duration: 300,
            type: 'slide',
            
            duration: me.getAnimation().duration || 250,
            preserveEndState: true
        });
        
        animation = new Ext.fx.Animation(config);
        
        if(this.fromBackButton == true ){
        	
        		
        		animation.setDirection('left');
        	
        }else{
        		
        		animation.setDirection('right');
        }
        
        animation.on('animationend', function() {
            if (callback) {
                callback.call(me);
            }
            
        }, me);

        Ext.Animator.run(animation);
        me.activeAnimations.push(animation);
        
    },
    
    doChangeView: function(view, hasPrevious, reverse) {
        var me = this,
            leftBox = me.leftBox,
            leftBoxElement = leftBox.element,
            titleComponent = me.titleComponent,
            titleElement = titleComponent.element,
            backButton = me.getBackButton(),
            titleText = me.getTitleText(),
            backButtonText = me.getBackButtonText(),
            animation = me.getAnimation() && view.getLayout().getAnimation(),
            animated = animation && animation.isAnimation && view.isPainted(),
            properties, leftGhost, titleGhost, leftProps, titleProps;

        if (animated) {
            leftGhost = me.createProxy(leftBox.element);
            leftBoxElement.setStyle('opacity', '0');
            backButton.setText(backButtonText);
            backButton[hasPrevious ? 'show' : 'hide']();

            titleGhost = me.createProxy(titleComponent.element.getParent());
            titleElement.setStyle('opacity', '0');
            me.setTitle(titleText);

            me.refreshTitlePosition();

            properties = me.measureView(leftGhost, titleGhost, reverse);
            leftProps = properties.left;
            titleProps = properties.title;

            me.isAnimating = true;

            me.animate(leftBoxElement, leftProps.element);
            me.animate(titleElement, titleProps.element, function() {
                titleElement.setLeft(properties.titleLeft);
                me.isAnimating = false;
                this.fromBackButton = false;
            });

            if (Ext.os.is.Android2 && !this.getAndroid2Transforms()) {
                leftGhost.ghost.destroy();
                titleGhost.ghost.destroy();
            }
            else {
                me.animate(leftGhost.ghost, leftProps.ghost);
                me.animate(titleGhost.ghost, titleProps.ghost, function() {
                    leftGhost.ghost.destroy();
                    titleGhost.ghost.destroy();
                });
            }
        }
        else {
            if (hasPrevious) {
                backButton.setText(backButtonText);
                backButton.show();
            }
            else {
                backButton.hide();
            }
            me.setTitle(titleText);
        }
    }

    
});


Ext.define('Ext.tab.PanelRtl', {
    override: 'Ext.tab.Panel',
    config: {

        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'right'
            }
        },
    }
});

Ext.define('Ext.field.FieldRtl', {
    override: 'Ext.field.Field',
    config: {
	labelAlign:'right'
        
    }
});


