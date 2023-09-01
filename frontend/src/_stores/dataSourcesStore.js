import { create, zustandDevTools } from './utils';
import { datasourceService, globalDatasourceService } from '@/_services';
import { shallow } from 'zustand/shallow';

const initialState = {
  dataSources: [],
  loadingDataSources: true,
  globalDataSources: [],
  globalDataSourceStatus: {
    isSaving: false,
    isEditing: false,
    unSavedModalVisible: false,
    action: null,
    saveAction: null,
  },
};

export const useDataSourcesStore = create(
  zustandDevTools(
    (set, get) => ({
      ...initialState,
      actions: {
        //DON'T REMOVE environmentId WHILE RESOLVING CONFLICTS !!!
        fetchDataSources: (appId, environmentId) => {
          set({ loadingDataSources: true });
          datasourceService.getAll(appId, environmentId).then((data) => {
            set({
              dataSources: data.data_sources,
              loadingDataSources: false,
            });
          });
        },
        fetchGlobalDataSources: (organizationId, appVersionId, environmentId) => {
          globalDatasourceService.getAll(organizationId, appVersionId, environmentId).then((data) => {
            set({
              globalDataSources: data.data_sources,
            });
          });
        },
        setGlobalDataSourceStatus: (status) =>
          set({
            globalDataSourceStatus: {
              ...get().globalDataSourceStatus,
              ...status,
            },
          }),
      },
    }),
    { name: 'Data Source Store' }
  )
);

export const useDataSources = () => useDataSourcesStore((state) => state.dataSources);
export const useGlobalDataSources = () => useDataSourcesStore((state) => state.globalDataSources);
export const useLoadingDataSources = () => useDataSourcesStore((state) => state.loadingDataSources);
export const useDataSourcesActions = () => useDataSourcesStore((state) => state.actions);
export const useGlobalDataSourcesStatus = () => useDataSourcesStore((state) => state.globalDataSourceStatus, shallow);
