<?php

namespace App\Entity;

use App\Repository\ExamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints\Choice;

/**
 * @ORM\Entity(repositoryClass=ExamRepository::class)
 * @ApiResource(
 *     attributes={
 *     "pagination_enabled"=true,
 *     "order": {"code"="desc"}
 *     },
 *     normalizationContext={"groups"={"exam_read"}},
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"title":"partial"})
 */
class Exam
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"exam_read","questions_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"exam_read","questions_read", "users_read"})
     * @Assert\NotBlank(message="code is required")
     * @Assert\Length(
     *      min = 1,
     *      max = 10000,
     *      minMessage = "code must be at least 1 digits long",
     *      maxMessage = "code cannot be longer than 1000 digits"
     * )
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"exam_read","questions_read", "users_read"})
     * @Assert\NotBlank(message="title is required")
     * @Assert\Length(
     *      min = 3,
     *      max = 10000,
     *      minMessage = "title must be at least 3 characters long",
     *      maxMessage = "title cannot be longer than 1000 characters"
     * )
     */
    private $title;

    /**
     * @ORM\ManyToMany(targetEntity=Question::class, inversedBy="exams")
     * @Groups({"exam_read"})
     */
    private $questions;

    /**
     * @ORM\ManyToOne(targetEntity=Module::class, inversedBy="exams")
     * @ORM\JoinColumn(nullable=false)
     */
    private $module;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?int
    {
        return $this->code;
    }

    public function setCode(int $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection<int, Question>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        $this->questions->removeElement($question);

        return $this;
    }

    public function getModule(): ?Module
    {
        return $this->module;
    }

    public function setModule(?Module $module): self
    {
        $this->module = $module;

        return $this;
    }
}
