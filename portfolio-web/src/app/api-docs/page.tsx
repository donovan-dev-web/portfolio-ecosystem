'use client';

import { ApiReferenceReact } from '@scalar/api-reference-react';

import '@scalar/api-reference-react/style.css';

export default function ApiDocsPage() {
  return (
    <ApiReferenceReact
      configuration={{
        _integration: 'nextjs',
        url: '/openapi.json',
        hideDarkModeToggle: true,
        hideClientButton: true,
        hideSearch: true,
        layout: 'modern',
        theme: 'kepler',
        showSidebar: true,
        showDeveloperTools: 'localhost',
        operationTitleSource: 'summary',
        persistAuth: false,
        telemetry: true,
        isEditable: false,
        isLoading: false,
        hideModels: false,
        documentDownloadType: 'both',
        hideTestRequestButton: false,
        showOperationId: false,
        withDefaultFonts: true,
        defaultOpenAllTags: false,
        expandAllModelSections: false,
        expandAllResponses: false,
        orderSchemaPropertiesBy: 'alpha',
        orderRequiredPropertiesFirst: true,
        default: false,
        slug: 'api-1',
        title: 'API #1',
      }}
    />
  );
}
