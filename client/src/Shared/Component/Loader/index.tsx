import * as React from "react";

import { Loader1, Loader2, Loader3, Holder } from "./styles";

export default function Loader() {
  return (
    <Holder>
      <div>
        <Loader1 />
        <Loader2 />
        <Loader3 />
      </div>
    </Holder>
  );
}
