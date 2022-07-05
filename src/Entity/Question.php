<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
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
 * @ORM\Entity(repositoryClass=QuestionRepository::class)
 * @ApiResource(
 *     attributes={
 *     "pagination_enabled"=true,
 *     "order": {"code"="desc"}
 *     },
 *     normalizationContext={"groups"={"questions_read"}},
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"description":"partial"})
 */
class Question
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"questions_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"questions_read", "users_read"})
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
     * @ORM\Column(type="text")
     * @Groups({"questions_read", "users_read"})
     * @Assert\NotBlank(message="description is required")
     * @Assert\Length(
     *      min = 1,
     *      max = 10000,
     *      minMessage = "description must be at least 3 characters long",
     *      maxMessage = "description cannot be longer than 1000 characters"
     * )
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"questions_read", "users_read"})
     * @Assert\NotBlank(message="dificulty is required")
     * @Assert\Choice(choices={"EASY", "MEDIUM", "HARD"})
     */
    private $dificulty;

    /**
     * @ORM\ManyToMany(targetEntity=Exam::class, mappedBy="questions")
     * @Groups({"questions_read", "users_read"})
     */
    private $exams;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="questions")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"questions_read", "module_read"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Module::class, inversedBy="questions")
     * @ORM\JoinColumn(nullable=false, onDelete="CASCADE")
     * @Groups({"module_read"})
     */
    private $module;

    public function __construct()
    {
        $this->exams = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?int
    {
        return $this->code;
    }

    public function setCode(?int $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDificulty(): ?string
    {
        return $this->dificulty;
    }

    public function setDificulty(?string $dificulty): self
    {
        $this->dificulty = $dificulty;

        return $this;
    }

    /**
     * @return Collection<int, Exam>
     */
    public function getExams(): Collection
    {
        return $this->exams;
    }

    public function addExam(Exam $exam): self
    {
        if (!$this->exams->contains($exam)) {
            $this->exams[] = $exam;
            $exam->addQuestion($this);
        }

        return $this;
    }

    public function removeExam(Exam $exam): self
    {
        if ($this->exams->removeElement($exam)) {
            $exam->removeQuestion($this);
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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
