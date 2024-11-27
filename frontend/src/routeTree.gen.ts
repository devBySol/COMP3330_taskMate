/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TasksImport } from './routes/tasks'
import { Route as CreateTaskImport } from './routes/createTask'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TasksRoute = TasksImport.update({
  id: '/tasks',
  path: '/tasks',
  getParentRoute: () => rootRoute,
} as any)

const CreateTaskRoute = CreateTaskImport.update({
  id: '/createTask',
  path: '/createTask',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/createTask': {
      id: '/createTask'
      path: '/createTask'
      fullPath: '/createTask'
      preLoaderRoute: typeof CreateTaskImport
      parentRoute: typeof rootRoute
    }
    '/tasks': {
      id: '/tasks'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof TasksImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/createTask': typeof CreateTaskRoute
  '/tasks': typeof TasksRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/createTask': typeof CreateTaskRoute
  '/tasks': typeof TasksRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/createTask': typeof CreateTaskRoute
  '/tasks': typeof TasksRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/createTask' | '/tasks'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/createTask' | '/tasks'
  id: '__root__' | '/' | '/about' | '/createTask' | '/tasks'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  CreateTaskRoute: typeof CreateTaskRoute
  TasksRoute: typeof TasksRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  CreateTaskRoute: CreateTaskRoute,
  TasksRoute: TasksRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/createTask",
        "/tasks"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/createTask": {
      "filePath": "createTask.tsx"
    },
    "/tasks": {
      "filePath": "tasks.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
