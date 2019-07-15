import {
  SourceWithOptions,
  Sources,
} from '@kyma-project/documentation-component';
import { Asset, File, DT } from './types';
import {
  markdownTypes,
  openApiTypes,
  asyncApiTypes,
  odataTypes,
} from '../constants';

export class DocsLoader {
  private sources: SourceWithOptions[] = [];
  private docsTopic: DT = {} as DT;
  private sortServiceClassDocumentation: boolean = false;

  setDocsTopic(docsTopic: DT): void {
    this.docsTopic = docsTopic;
    this.clear();
  }

  setSortServiceClassDocumentation(sort: boolean = false): void {
    this.sortServiceClassDocumentation = sort;
  }

  async fetchAssets(): Promise<void> {
    await Promise.all([
      await this.setDocumentation(),
      await this.setSpecification(openApiTypes),
      await this.setSpecification(asyncApiTypes),
      await this.setSpecification(odataTypes),
    ]);
  }

  getSources(considerAsGroup: boolean = false): Sources {
    if (!considerAsGroup) {
      return this.sources;
    }

    const sources: Sources = [
      {
        sources: this.sources,
      },
    ];
    return sources;
  }

  private async setDocumentation(): Promise<void> {
    const markdownFiles = this.extractDocumentation();

    if (markdownFiles) {
      const sources = (await Promise.all(
        markdownFiles.map(file => this.fetchFile(file, 'md')),
      )).filter(
        source => source && source !== undefined,
      ) as SourceWithOptions[];

      if (sources && sources.length) {
        this.sources.push(...sources);
      }
    }
  }

  private async setSpecification(types: string[]): Promise<void> {
    const specification = this.extractSpecification(types);

    if (specification) {
      const source = await this.fetchFile(specification, types[0]);
      if (source) {
        this.sources.push(source);
      }
    }
  }

  private async fetchFile(
    file: File | undefined,
    type: string,
  ): Promise<SourceWithOptions | undefined> {
    if (!file) {
      return;
    }

    return await fetch(file.url)
      .then(response => {
        if (openApiTypes.includes(type)) {
          return response.json();
        }
        return response.text();
      })
      .then(text => {
        const source: SourceWithOptions = {
          source: {
            type,
            rawContent: text,
            data: {
              frontmatter: file.metadata,
              url: file.url,
              disableRelativeLinks: true,
            },
          },
        };

        return source;
      })
      .catch(err => {
        throw err;
      });
  }

  private extractDocumentation() {
    const markdownAssets = this.extractAssets(markdownTypes);

    let data =
      markdownAssets &&
      markdownAssets.length &&
      markdownAssets[0] &&
      markdownAssets[0].files.filter(el => el.url.endsWith('.md'));

    if (data && this.sortServiceClassDocumentation) {
      data = data.sort((first, sec) => {
        const firstData = (
          first.metadata.title || first.metadata.type
        ).toLowerCase();
        const secondData = (
          sec.metadata.title || sec.metadata.type
        ).toLowerCase();

        return firstData === 'overview'
          ? -1
          : secondData === 'overview'
          ? 1
          : 0;
      });
    }

    return data;
  }

  private extractSpecification(types: string[]) {
    const openApiAsset = this.extractAssets(types);

    const file =
      openApiAsset &&
      openApiAsset[0] &&
      openApiAsset[0].files &&
      openApiAsset[0].files[0] &&
      openApiAsset[0].files[0];

    return file;
  }

  private extractAssets(types: string[]): Asset[] | undefined {
    const assets = this.docsTopic && (this.docsTopic.assets as Asset[]);

    return assets.filter(asset => types.includes(asset.type));
  }

  private clear(): void {
    this.sources = [];
  }
}

export const loader = new DocsLoader();
