class TagsController < ApplicationController
  def index
    # @tags = Tag.all
    @tags = Tag.joins(:participants).group(:id).order('COUNT(tags.id) DESC')
    authorize @tags
  end

  def show
    @tag = Tag.find(params[:id])
    @particpants = @tag.participants
    authorize @tag
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
    is_updated = @tag.update_attributes(tag_params)
    authorize @tag

    if is_updated
      redirect_to tags_path
    else
      flash[:error] = "Error saving tag. Please try again."
      render :edit
    end
  end

  def destroy
  @tag = Tag.find(params[:id])
  authorize @tag

  if @tag.destroy
    flash[:notice] = "tag was deleted successfully."
    redirect_to tags_path
  else
    flash[:error] = "Error in deleting sprint. Please try again."
    render :show
  end
end

  private
  def tag_params
    params.require(:tag).permit(
      :new_tag)
    end

end
