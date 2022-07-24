import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailsPage} from "./pages/DetailsPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (<Routes>
            <Route exact path="/links" element={<LinksPage/>}/>
            <Route exact path="/create" element={<CreatePage/>}/>
            <Route exact path="/detail/:id" element={<DetailsPage/>}/>
            <Route path="*" element={<Navigate to="/create"/>}/>
        </Routes>)
    }
    return (<Routes>
        <Route exact path="/auth" element={<AuthPage/>}/>
        <Route path="*" element={<Navigate to="/auth"/>}/>
    </Routes>);
}