UmlCanvas.Interface = Class.create( UmlCanvas.Class, {
    preprocess: function( props ) {
	if( props['stereotype'] ) {
	    props['stereotype'] = "interface " + props['stereotype'];
	} else {
	    props['stereotype'] = "interface";
	}
	props.isAbstract = true;
	return props;
    },
    
    getFontForClassName : function() {
        return this.getFont();
    },
    
    getFontForOperationName : function(operation) {
        return this.getFont();
    },
    
    asConstruct: function($super) {
	var construct = $super();
	// TODO
	return construct;
    }

} );

UmlCanvas.Interface.from = function( construct, diagram ) {
    var props = {};
    
    // NAME
    props.name = construct.name;

    // MINIMUM WIDTH
    var minimumWidth = construct.modifiers.get( "minimumWidth" );
    if( minimumWidth ) {
        props.minimumWidth = parseInt(minimumWidth.value.value);
    }
    
    // STEREOTYPE
    var stereotype = construct.modifiers.get("stereotype" );
    if( stereotype ) {
	props.stereotype = stereotype.value.value;
    }

    var elem = new UmlCanvas.Interface( props );

    // SUPERCLASS
    if( construct.zuper ) {
	var zuper = diagram.getClass(construct.zuper.constructName);
	var relation;
	if( zuper instanceof UmlCanvas.Interface ) {
	    relation = new UmlCanvas.Realization( zuper, elem );
	} else {
	    relation = new UmlCanvas.Inheritance( zuper, elem );
	}
	diagram.addRelation(relation);
    }

    var left, top;
    if( construct.annotation ) {    
	var pos = construct.annotation.data.split(",");
	left = parseInt(pos[0]);
	top  = parseInt(pos[1]);
    } else {
	left = this.offset * ( this.unknownIndex++ );
	top = left;
    }
    diagram.at(left,top).put(elem);
    return elem;
};

UmlCanvas.Interface.MANIFEST = {
    name         : "interface",
    propertyPath : [ Canvas2D.Rectangle, UmlCanvas.Class ],
    libraries    : [ "UmlCanvas" ]
}

Canvas2D.registerShape(UmlCanvas.Interface);
