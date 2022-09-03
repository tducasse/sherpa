import { MouseEvent, useRef } from "react";
import { Marker } from "../types";

const BUFFER = 10;

const WithMarkers: React.FC<{
  src?: string;
  onAddMarker?: Function;
  markers: Marker[];
}> = ({ src, onAddMarker, markers }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (!(markers.length < 4 && imgRef?.current && onAddMarker)) return;
    onAddMarker(
      calculateMarkerPosition(
        e,
        imgRef.current.getBoundingClientRect(),
        window.scrollY
      )
    );
  };

  return src ? (
    <div
      style={{
        position: "relative",
        margin: "0 auto",
      }}
    >
      <img
        ref={imgRef}
        src={src}
        onClick={onClick}
        alt="bouldering wall"
        style={{
          objectFit: "contain",
          maxHeight: "100vh",
        }}
      />
      {markers.map((marker: Marker, index: number) => (
        <div
          key={`${marker.top}-${marker.left}`}
          onClick={onClick}
          style={{
            position: "absolute",
            width: BUFFER * 2 + 1,
            height: BUFFER * 2 + 1,
            backgroundColor: getColor(index),
            color: "white",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            textTransform: "uppercase",
            fontSize: BUFFER,
            ...getItemPosition(marker),
          }}
        >
          {getLimb(index)}
        </div>
      ))}
    </div>
  ) : null;
};

const getColor = (index: number) => {
  const colors = ["red", "blue", "green", "orange"];
  return colors[index % colors.length];
};

const getLimb = (index: number) => {
  const limbs = ["rh", "lh", "rf", "lf"];
  return limbs[index % limbs.length];
};

const calculateMarkerPosition = (
  mousePosition: MouseEvent,
  imagePosition: DOMRect,
  scrollY: number
) => {
  const pixelsLeft = mousePosition.clientX - imagePosition.left;
  let pixelsTop;
  if (imagePosition.top < 0) {
    pixelsTop = mousePosition.pageY - scrollY + imagePosition.top * -1;
  } else {
    pixelsTop = mousePosition.pageY - scrollY - imagePosition.top;
  }
  const top = ((pixelsTop - BUFFER) * 100) / imagePosition.height;
  const left = ((pixelsLeft - BUFFER) * 100) / imagePosition.width;
  return { top, left };
};

const getItemPosition = (marker: Marker) => {
  return {
    top: `${marker.top}%`,
    left: `${marker.left}%`,
  };
};

export default WithMarkers;
