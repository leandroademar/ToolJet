import React, { useState, useEffect, useContext } from 'react';
import cx from 'classnames';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/_ui/Layout';
import { ManageAllUsers } from '@/ManageAllUsers';
import { ManageInstanceSettings, ManageWhiteLabelling } from '@/ManageInstanceSettings';
import { authenticationService } from '@/_services/authentication.service';
import { toast } from 'react-hot-toast';
import { BreadCrumbContext } from '@/App/App';
import { OrganizationList } from '@/_components/OrganizationManager/List';
import FolderList from '@/_ui/FolderList/FolderList';
import { ManageLicenseKey } from '@/ManageLicenseKey';
import { LicenseTooltip } from '@/LicenseTooltip';
import { LicenseBanner } from '@/LicenseBanner';
import { licenseService } from '@/_services';
import Skeleton from 'react-loading-skeleton';

export function InstanceSettings(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [featureAccess, setFeatureAccess] = useState({});
  const [licenseLoaded, setLicenseLoaded] = useState(false);
  const error = searchParams.get('error');
  const licenseCheck = searchParams.get('save_license');
  const [selectedTab, setSelectedTab] = useState(
    error === 'license' || licenseCheck === 'success' ? 'License' : 'Users'
  );
  const { load_app } = authenticationService.currentSessionValue;
  const { updateSidebarNAV } = useContext(BreadCrumbContext);

  const sideBarNavs = ['All users', 'Manage instance settings', 'License', 'White labelling'];
  const protectedNavs = ['Manage instance settings', 'White labelling'];

  const defaultOrgName = (groupName) => {
    switch (groupName) {
      case 'All users':
        return 'Users';
      case 'Manage instance settings':
        return 'Settings';
      case 'License':
        return 'License';
      case 'White labelling':
        return 'White labelling';
      default:
        return groupName;
    }
  };

  const paidFeatures = { 'White labelling': 'whiteLabelling' };

  const fetchFeatureAccess = (loadingAtFirstTime = false) => {
    licenseService.getFeatureAccess().then((data) => {
      setFeatureAccess({ ...data });
      if (data.licenseStatus.isExpired || !data.licenseStatus.isLicenseValid) {
        setSelectedTab(loadingAtFirstTime ? 'Users' : 'License');
        updateSidebarNAV(loadingAtFirstTime ? 'All users' : 'License');
      }
      setLicenseLoaded(true);
    });
  };

  useEffect(() => {
    fetchFeatureAccess(true);
    load_app && error === 'license' && toast.error('Your license key has expired. Please update your license key');
    load_app &&
      licenseCheck === 'success' &&
      toast.success('License key has been updated', {
        position: 'top-center',
      });
    load_app && updateSidebarNAV(selectedTab);
    searchParams.delete('error');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    load_app === true &&
    licenseLoaded && (
      <Layout switchDarkMode={props.switchDarkMode} darkMode={props.darkMode}>
        <div className="wrapper organization-settings-page">
          <div className="row gx-0">
            <div className="organization-page-sidebar col ">
              <div className="workspace-nav-list-wrap">
                {licenseLoaded ? (
                  sideBarNavs.map((item, index) => {
                    const proctedNavIndex = protectedNavs.indexOf(item);
                    const Wrapper = ({ children }) =>
                      proctedNavIndex >= 0 ? (
                        <LicenseTooltip
                          limits={featureAccess}
                          feature={item}
                          isAvailable={true}
                          noTooltipIfValid={true}
                        >
                          {children}
                        </LicenseTooltip>
                      ) : (
                        <>{children}</>
                      );
                    return (
                      <Wrapper key={index}>
                        <FolderList
                          className="workspace-settings-nav-items"
                          onClick={() => {
                            if (
                              (featureAccess.licenseStatus.isExpired ||
                                !featureAccess.licenseStatus.isLicenseValid ||
                                featureAccess?.[paidFeatures?.[item]] === false) &&
                              protectedNavs.includes(item) === true
                            )
                              return;
                            setSelectedTab(defaultOrgName(item));
                            updateSidebarNAV(item);
                          }}
                          selectedItem={selectedTab == defaultOrgName(item)}
                          dataCy={item.toLowerCase().replace(/\s+/g, '-')}
                        >
                          {item}
                        </FolderList>
                      </Wrapper>
                    );
                  })
                ) : (
                  <Skeleton count={3} height={22} />
                )}
              </div>
              <LicenseBanner
                limits={featureAccess}
                classes="m-3 trial-banner"
                size="xsmall"
                type={featureAccess?.licenseStatus?.licenseType}
              />
              <OrganizationList />
            </div>

            {licenseLoaded ? (
              <div className={cx('col workspace-content-wrapper')} style={{ paddingTop: '40px' }}>
                <div className="w-100">
                  {selectedTab === 'Users' && <ManageAllUsers darkMode={props.darkMode} />}
                  {selectedTab === 'Settings' && <ManageInstanceSettings />}
                  {selectedTab === 'License' && (
                    <ManageLicenseKey fetchFeatureAccessForInstanceSettings={fetchFeatureAccess} />
                  )}
                  {selectedTab === 'White labelling' && featureAccess?.whiteLabelling && <ManageWhiteLabelling />}
                </div>
              </div>
            ) : (
              <div className="col workspace-content-wrapper">
                <div style={{ width: '880px', margin: 'auto', marginTop: '150px' }}>
                  <Skeleton className="mb-2" />
                  <Skeleton className="mb-2" />
                  <Skeleton className="mb-2" />
                  <Skeleton />
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    )
  );
}
