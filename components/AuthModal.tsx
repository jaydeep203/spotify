"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import React, {useEffect} from 'react'
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/UseAuthModal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose, isOpen} = useAuthModal();

    useEffect(()=> {
        if(session){
            router.refresh();
            onClose();
        }
    },[session, router, onClose]);

    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }

  return (
    <Modal
        title="Test mo"
        description="description"
        isOpen={isOpen}
        onChange={onChange}
    >
        <Auth 
            theme="dark"
            providers={["github"]}
            magicLink
            supabaseClient={supabaseClient}
            appearance={{
                theme:ThemeSupa,
                variables:{
                    default:{
                        colors:{
                            brand:"#404040",
                            brandAccent:"#22c55e"
                        }
                    }
                }
            }}
        />
    </Modal>
  )
}

export default AuthModal