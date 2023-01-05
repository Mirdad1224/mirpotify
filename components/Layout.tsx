import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import client from "../shared/spotify-client";
import Navbar from "./Navbar";
import Player from "./Player";

enum LoadingStates {
  loading,
  finished,
  error,
}
const Layout = ({ children }: { children: JSX.Element }) => {
  const [loadingState, setLoadingState] = useState(LoadingStates.loading);

  const { playerId } = useContext(PlayerContext);
  console.log(
    `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString("base64")}`
  );
  console.log(process.env.NEXT_PUBLIC_FINAL);
  useEffect(() => {
    localStorage.setItem("mirpotify-playing", playerId);
  }, [playerId]);
  useEffect(() => {
    // const data = new URLSearchParams()
    // data.append('grant_type','client_credentials')
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Authorization",
      `Basic ${process.env.NEXT_PUBLIC_FINAL?.toString()}`
    );
    // myHeaders.append("Cookie", "__Host-device_id=AQBCZnpBGImv3mJt8W85k2bUxiA6TgsdxL__34W464Yxm6wi_EoeOppiLB4a9Gv2kHDwTDUM2ZtxKTZQRSXqgg06C-w17rkBU6g");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch("https://accounts.spotify.com/api/token", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access_token) {
          setLoadingState(LoadingStates.finished);
          client.setAccessToken(data.access_token);
        } else setLoadingState(LoadingStates.error);
      })
      .catch((err) => {
        console.log(err);
        setLoadingState(LoadingStates.error);
      });
    // var urlencoded = new URLSearchParams();
    // urlencoded.append("grant_type", "client_credentials");
    // fetch("https://accounts.spotify.com/api/token", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization:
    //       "Basic " +
    //       Buffer.from(
    //         process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
    //       ).toString("base64"),
    //   },
    //   body: urlencoded,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.access_token) {
    //       setLoadingState(LoadingStates.finished);
    //       client.setAccessToken(data.access_token);
    //     } else setLoadingState(LoadingStates.error);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoadingState(LoadingStates.error);
    //   });
  }, []);

  if (loadingState === LoadingStates.loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
        </div>
      </div>
    );

  if (loadingState === LoadingStates.error)
    return <div className="grid place-items-center">Something went wrong</div>;
  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-144px)]">{children}</div>
      {!!playerId && <Player key={playerId} />}
    </>
  );
};
export default Layout;
