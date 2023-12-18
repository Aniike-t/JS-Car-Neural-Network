class GraphEditor{
    constructor(canvas, graph){
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext("2d");

        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.#addEventListeners();
    }

    //Private method for event listeners
    #addEventListeners(){
        this.canvas.addEventListener("mousedown",   this.#handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove",   this.#handleMouseMove.bind(this));
        this.canvas.addEventListener("contextmenu",(evt)=>{
            evt.preventDefault();
        })
        this.canvas.addEventListener("mouseup",()=>{
            this.dragging = false;
        }
        )
    }

    //So that the point isnt highlighted even if its deleted
    //THIS METHOD DIDNT WORK FOR ME SO I COMMENTED IT OUT
    // #removePoint(point){
    //     this.graph.removePoint(point);
    //     this.hovered = null;
    //     if(this.hovered == point){
    //         this.selected = null;
    //     }
    // }
    // this.graph.removePoint(this.hovered);

    #handleMouseDown(evt){
        {
            //Check if right click
            if(evt.button === 2){
                if(this.selected){
                    this.selected = null;
                }
                else if(this.hovered){
                    this.graph.removePoint(this.hovered);
                    this.selected = null;
                    this.hovered = null;
                }
            }
            if(evt.button === 0){
                //Check if mouse is hovering over a point if hovered make it highlighted    
                if(this.hovered){
                        this.#select(this.hovered);
                        this.dragging = true;
                        return;
                    }
                    this.graph.addPoint(this.mouse);
                    this.#select(this.mouse);
                    this.hovered = this.mouse;        
                }
        }
    }

    #handleMouseMove(evt)
    {
        this.mouse = new Point(evt.offsetX,evt.offsetY);
        //Check if mouse is hovering over a point if hovered make it highlighted    
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
        if(this.dragging == true){
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    #select(point){
        if(this.selected){
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }

    display(){
        this.graph.draw(this.ctx);
        if(this.hovered){
            this.hovered.draw(this.ctx,{ fill: true });
        }
        if(this.selected){
            const intent = this.hovered ? this.hovered : this.mouse;
            new Segment(this.selected, intent).draw(ctx,{ dash:[3,3] });
            this.selected.draw(this.ctx,{ outline: true });
        }
    }
}