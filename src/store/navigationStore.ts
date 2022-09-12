import { acceptHMRUpdate, defineStore } from 'pinia'
import { fetchContentNavigation, queryContent, useAsyncData } from "#imports";
import PAGE from "const/page-name-constants";
import { NavItem } from "@nuxt/content/dist/runtime/types";
import { IPageLink } from "~/common/types/IPageLink";

interface INavigationState {
    pageItems: IPageLink[],
    sideBarState: Map<string, string[]>,
    navItems: NavItem[]
}

export const useNavigationStore = defineStore('navigationStore', {
    state: (): INavigationState => {
        return {
            pageItems: [
                {
                    label: 'Guides',
                    path: `/${ PAGE.GUIDES }`,
                },
                {
                    label: 'Demo',
                    path: `/${ PAGE.DEMO }`,
                },
                {
                    label: 'FAQ',
                    path: `/${ PAGE.FAQ }`,
                },
                {
                    label: 'Contributing',
                    path: `/${ PAGE.CONTRIBUTING }`,
                },
                {
                    label: 'Acknowledgements',
                    path: `/${ PAGE.ACKNOWLEDGEMENTS }`,
                },
            ],
            navItems: [],
            sideBarState: new Map<string, string[]>(),
        }
    },
    actions: {
        async setup() {
            const { data } = await useAsyncData(() => fetchContentNavigation(queryContent(PAGE.GUIDES)));
            this.navItems = data.value ?? [];
        },
        setSidebarState(key: string, selected: string[]) {
            this.sideBarState.set(key, selected)
        }
    },

    getters: {
        getPageNavItems: (state) => state.pageItems,
        getSidebarState: (state) => {
            return (key) => state.sideBarState.get(key)
        },
        getGuidesNavItems: (state) => {
            return state.navItems.find(x => x._path.substring(1) === PAGE.GUIDES)?.children.filter(x => x._path.substring(1) !== PAGE.GUIDES) ?? [];
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNavigationStore, import.meta.hot))
}