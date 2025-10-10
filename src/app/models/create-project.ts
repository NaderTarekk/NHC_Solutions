export interface CreateProjectDto {
    projectTitle?: string,
    description?: string,
    demoVidUrl?: string,
    projectImages: ProjectImage[]
}

export interface ProjectImage {
    isMainImage: boolean;
    imageFile: File;
}