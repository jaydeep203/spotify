import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./UseAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const subscriptionModal = useSubscribeModal();
    const authModal = useAuthModal();
    const {user, subscription} = useUser();

    const onPlay = (id: string) => {
        if(!user){
            return authModal.onOpen();
        }

        // if(!subscription){
        //     return subscriptionModal.onOpen();
        // }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    };

    return onPlay;
}


export default useOnPlay;