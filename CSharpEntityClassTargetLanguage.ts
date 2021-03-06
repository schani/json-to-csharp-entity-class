#!/usr/bin/env ts-node

import { OrderedSet, Map } from "immutable";
import * as handlebars from "handlebars";
import * as fs from "fs";

import { Run, Options, quicktypeMultiFile } from "quicktype";
import { TypeGraph } from "quicktype/dist/TypeGraph";
import { ConvenienceRenderer } from "quicktype/dist/ConvenienceRenderer";
import { ClassType, ClassProperty, Type } from "quicktype/dist/Type";
import { Name, FixedName } from "quicktype/dist/Naming";
import { capitalize } from "quicktype/dist/Strings";
import { parseCLIOptions, makeQuicktypeOptions, writeOutput } from "quicktype/dist/cli";
import {
    TypeKind,
    EnumType,
    UnionType,
    matchType,
    nullableFromUnion,
    removeNullFromUnion,
    directlyReachableSingleNamedType
} from "quicktype/dist/Type";
import { Sourcelike, maybeAnnotated, modifySource } from "quicktype/dist/Source";
import {
    utf16LegalizeCharacters,
    utf16StringEscape,
    splitIntoWords,
    combineWords,
    firstUpperWordStyle,
    camelCase
} from "quicktype/dist/Strings";
import { intercalate, defined, assert, panic, StringMap } from "quicktype/dist/Support";
import { DependencyName, Namer, funPrefixNamer } from "quicktype/dist/Naming";
import { ForbiddenWordsInfo } from "quicktype/dist/ConvenienceRenderer";
import { CSharpTargetLanguage, CSharpRenderer } from "quicktype/dist/Language/CSharp";
import { StringOption, EnumOption, Option } from "quicktype/dist/RendererOptions";
import { anyTypeIssueAnnotation, nullTypeIssueAnnotation } from "quicktype/dist/Annotation";
import { StringTypeMapping } from "quicktype/dist/TypeBuilder";

const unicode = require("unicode-properties");

export type Version = 5 | 6;
export type OutputFeatures = { helpers: boolean; attributes: boolean };

export enum AccessModifier {
    None,
    Public,
    Internal
}

export default class CSharpEntityClassTargetLanguage extends CSharpTargetLanguage {
    protected get rendererClass(): new (
        graph: TypeGraph,
        leadingComments: string[] | undefined,
        ...optionValues: any[]
    ) => ConvenienceRenderer {
        return CSharpEntityClassRenderer;
    }
}

export class CSharpEntityClassRenderer extends CSharpRenderer {
    
}
