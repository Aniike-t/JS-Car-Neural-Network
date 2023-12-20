class Graph{
    constructor(points=[],segments=[]){
        this.points = points;
        this.segments = segments;
    }


    //Push the localstorage to the points array
    static load(info){
        const points = info.points.map((p)=>new Point(p.x,p.y));
        const segments = info.segments.map((i)=>new Segment(
            points.find((p) => p.equals(i.p1)),
            points.find((p) => p.equals(i.p2)),
        ));
        return new Graph(points,segments);
    }

    //Push the ranodm point to the points array
    addPoint(point){
        this.points.push(point);
    }

    //check if point is already in the graph by looping through the points array
    containsPoint(point){
        return this.points.includes((p)=>p.equals(point));
    }

    //Try to add point to the graph if it is not already in the graph or return false if not
    tryAddPoint(point){
        if(!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }
    //Adding new segment between point
    addSegment(seg) {
        this.segments.push(seg);
    }
    containsSegment(seg) {
        return this.segments.find((s) => s.equals(seg));
    }
    tryAddSegment(seg) {
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
            this.addSegment(seg);
            return true;
        }
        return false;
    }
    getSegmentsWithPoint(point){
        const segs =[];
        for(const seg of this.segments){
            if(seg.includes(point)){
                segs.push(seg);
            }
        }
        return segs;
    }

    //Remove segment from the graph
    removeSegment(seg){
        this.segments.splice(this.segments.indexOf(seg),1);
    }

    //Remove the point from the graph
    removePoint(point){
        const segs = this.getSegmentsWithPoint(point);
        for(const seg of segs){
            this.removeSegment(seg);
        }
        //Remove the point from the points array after removing all segments that contain that point
        this.points.splice(this.points.indexOf(point),1);
        //When removing a point, remove all segments that contain that point
    }

    dispose(){
        this.points.length = 0;
        this.segments.length = 0;

    }

    //Draw method
    draw(ctx){
        for(const seg of this.segments){
            seg.draw(ctx);
        }
        //draw points last so they are on top
        for(const point of this.points){
            point.draw(ctx);
        }
    }
}